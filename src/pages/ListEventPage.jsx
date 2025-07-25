import React, { useState } from "react"
import { supabase } from "../lib/supabaseClient"

const ListEventPage = () => {
  const [showThankYou, setShowThankYou] = useState(false)
  const [generatedCode, setGeneratedCode] = useState("") // Store the generated code to display
  const [submittedEventId, setSubmittedEventId] = useState(null)
  const [submittedEventType, setSubmittedEventType] = useState(null) // 'scraped' or 'user_submitted'
  const [selectedPromotion, setSelectedPromotion] = useState("")
  const [hasListedElsewhere, setHasListedElsewhere] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const towns = [
    "Montauk",
    "Amagansett",
    "East Hampton",
    "Wainscott",
    "Sagaponack",
    "Bridgehampton",
    "Water Mill",
    "Southampton",
    "North Sea",
    "Shinnecock Hills",
    "Hampton Bays",
    "Quogue",
    "Westhampton",
    "East Quogue",
    "Remsenburg-Speonk",
    "Flanders",
    "Northampton",
    "Noyack",
    "Quiogue",
    "Tuckahoe",
    "Springs",
    "East End",
    "Sagharbor",
    "Sag Harbor",
    "Shelter Island",
  ]

  const categories = [
    "Nature",
    "Government",
    "Arts",
    "Music",
    "Restaurant",
    "Community",
    "Film",
    "Library",
    "Health",
    "Nightlife",
    "Spiritual",
    "Featured",
  ]

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError("")

    const form = event.target
    const formData = new FormData(form)

    try {
      // Test storage bucket access
      console.log("Testing storage bucket access...")
      const { data: buckets, error: bucketError } =
        await supabase.storage.listBuckets()
      console.log("Available buckets:", buckets)
      console.log(
        "Bucket names:",
        buckets?.map((b) => b.name)
      )
      if (bucketError) {
        console.error("Bucket list error:", bucketError)
      }

      // Check if pending-images bucket exists
      const pendingImagesBucket = buckets?.find(
        (bucket) => bucket.name === "pending-images"
      )
      console.log("Pending images bucket:", pendingImagesBucket)

      if (!pendingImagesBucket) {
        console.error(
          "Available buckets:",
          buckets?.map((b) => b.name)
        )
        console.error("Total buckets found:", buckets?.length || 0)
        throw new Error(
          `Storage bucket 'pending-images' not found. Available buckets: ${
            buckets?.map((b) => b.name).join(", ") || "none"
          }. Please create this bucket in your Supabase dashboard under Storage section.`
        )
      }
      let imageUrl = null

      // Handle image upload if provided
      const imageFile = formData.get("event-image")
      if (imageFile && imageFile.size > 0) {
        const fileExt = imageFile.name.split(".").pop()
        const fileName = `${Date.now()}.${fileExt}`

        // Try to upload with current session, if it fails, try without auth
        let uploadData, uploadError

        try {
          console.log("Attempting to upload file:", fileName)
          console.log("File size:", imageFile.size)
          console.log("File type:", imageFile.type)

          const result = await supabase.storage
            .from("pending-images")
            .upload(fileName, imageFile)
          uploadData = result.data
          uploadError = result.error

          console.log("Upload result:", result)
        } catch (error) {
          console.error("Upload exception:", error)
          uploadError = error
        }

        if (uploadError) {
          console.error("Upload error details:", uploadError)
          console.error("Error message:", uploadError.message)
          console.error("Error details:", uploadError.details)
          throw new Error(
            `Failed to upload image: ${
              uploadError.message || "Unknown error"
            }. Please try again or contact support.`
          )
        }

        // Get the public URL for the uploaded image
        const {
          data: { publicUrl },
        } = supabase.storage.from("pending-images").getPublicUrl(fileName)

        imageUrl = publicUrl
      }

      // Validate that image file is provided for all submissions
      if (!imageFile || imageFile.size === 0) {
        throw new Error("Please upload an event image")
      }

      if (hasListedElsewhere === "yes") {
        // For events already listed elsewhere - insert into scraped_events table
        const scrapedEventData = {
          event_url: formData.get("event-url"),
          image_url: imageUrl,
          contact_name: formData.get("contact-name"),
          contact_email: formData.get("email"),
          contact_phone: formData.get("phone"),
          location: formData.get("company-name"), // Use company name as location
          category: formData.get("category"),
          status: "pending",
        }

        // Generate verification code for scraped events
        const verificationCode = generateVerificationCode()
        setGeneratedCode(verificationCode) // Store for display
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now

        // Add verification data to scraped event
        scrapedEventData.verification_code = verificationCode
        scrapedEventData.verification_expires_at = expiresAt.toISOString()
        scrapedEventData.email_verified = false

        const { data: scrapedData, error: scrapedError } = await supabase
          .from("scraped_events")
          .insert([scrapedEventData])
          .select()

        if (scrapedError) {
          throw new Error("Failed to submit event: " + scrapedError.message)
        }

        // Store the scraped event ID and type for verification
        if (scrapedData && scrapedData.length > 0) {
          setSubmittedEventId(scrapedData[0].id)
          console.log("Scraped event ID:", scrapedData[0].id)
        } else {
          console.log("No scraped data returned from insert")
        }
        setSubmittedEventType("scraped")

        // Verification code generated and stored in database
        console.log(
          "Verification code generated for scraped event:",
          verificationCode
        )
      } else {
        // For new events - insert into user_submitted_events table
        const eventData = {
          title: formData.get("event-title"),
          description: formData.get("event-description"),
          start_time: new Date(
            new Date(formData.get("start-time")).getTime() + 4 * 60 * 60 * 1000
          ).toISOString(),
          end_time: new Date(
            new Date(formData.get("end-time")).getTime() + 4 * 60 * 60 * 1000
          ).toISOString(),
          image_url: imageUrl,
          location: formData.get("company-name"), // Use company name as location
          cost: formData.get("cost"),
          address: formData.get("address"),
          category:
            selectedPromotion === "premium"
              ? "Featured"
              : formData.get("category"),
          registration_url: formData.get("registration-url") || null,
          contact_name: formData.get("contact-name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          status: "pending",
          headline_type: "normal",
          url:
            formData.get("registration-url") ||
            `user-submitted-${Date.now()}-${Math.random()
              .toString(36)
              .substr(2, 9)}`,
        }

        // Generate verification code
        const verificationCode = generateVerificationCode()
        setGeneratedCode(verificationCode) // Store for display
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now

        // Add verification data to event
        eventData.verification_code = verificationCode
        eventData.verification_expires_at = expiresAt.toISOString()
        eventData.email_verified = false

        const { data, error: insertError } = await supabase
          .from("user_submitted_events")
          .insert([eventData])
          .select()

        if (insertError) {
          throw new Error("Failed to submit event: " + insertError.message)
        }

        // Store the event ID and type for verification
        if (data && data.length > 0) {
          setSubmittedEventId(data[0].id)
          console.log("User submitted event ID:", data[0].id)
        } else {
          console.log("No user data returned from insert")
        }
        setSubmittedEventType("user_submitted")

        // Verification code generated and stored in database
        console.log(
          "Verification code generated for user submitted event:",
          verificationCode
        )
      }

      // Success - show thank you message directly
      console.log("Form submitted successfully, showing thank you message")
      form.reset()
      setShowThankYou(true)
      setShowForm(false)
      console.log("showThankYou set to:", true)
      console.log("showForm set to:", false)

      // Keep thank you message visible - don't auto-hide
      // User can manually reset when they want to submit another event
    } catch (error) {
      console.error("Form submission error:", error)
      setError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePromotionSelect = (promotionType) => {
    setSelectedPromotion(promotionType)
  }

  const handleListedElsewhere = (answer) => {
    setHasListedElsewhere(answer)
    if (answer === "yes") {
      setShowForm(true)
    } else {
      setShowForm(true)
    }
  }

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  const resetFlow = () => {
    setShowThankYou(false)
    setSelectedPromotion("")
    setHasListedElsewhere(null)
    setShowForm(false)
    setGeneratedCode("")
    setSubmittedEventId(null)
    setSubmittedEventType(null)
    setError("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section - only show when not showing thank you message */}
        {!showThankYou && (
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Promote Your Thing
            </h1>
            <p className="text-xl text-gray-600">
              Get your event noticed by the Hamptons community! Choose from our
              premium promotion options or list your event for free.
            </p>
          </div>
        )}

        {/* Thank You Message - Show prominently when form is submitted */}
        {showThankYou && (
          <div className="text-center py-12">
            <div
              id="thank-you-message"
              className="max-w-md mx-auto p-8 bg-green-50 text-green-800 rounded-2xl text-center border border-green-200 transform transition-all duration-500 ease-in-out animate-fade-in shadow-lg"
              style={{
                animation: "fadeIn 0.5s ease-in-out",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
            >
              <div className="flex items-center justify-center mb-4">
                <svg
                  className="w-12 h-12 text-green-500 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <h2 className="text-3xl font-bold text-green-800">
                  Thank You!
                </h2>
              </div>
              <p className="text-green-700 mb-6 text-lg">
                Thank you, we received your form submission.
              </p>
              <button
                onClick={resetFlow}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-sm hover:shadow-md font-medium"
              >
                Submit Another Event
              </button>
            </div>
          </div>
        )}

        {/* Step 1: Pricing Cards */}
        {!showThankYou && !selectedPromotion && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Step 1: Choose Your Promotion
              </h2>
              <p className="text-gray-600">
                Select how you'd like to promote your event
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Premium Promotion Card */}
              <div
                className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={() => handlePromotionSelect("premium")}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Premium Promotion
                  </h3>
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
                </div>
                <div className="space-y-4">
                  <div className="border-b border-gray-100 pb-4">
                    <h4 className="text-xl font-semibold text-gray-900">
                      Main Featured Tab
                    </h4>
                    <p className="text-3xl font-bold text-blue-600">
                      $10<span className="text-lg">/day</span>
                    </p>
                    <ul className="mt-4 space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-2 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Top placement on our homepage
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-2 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Larger image display
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-2 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Priority listing in event categories
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-2 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Social media promotion included
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Free Listing Card */}
              <div
                className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={() => handlePromotionSelect("free")}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Free Event Listing
                  </h3>
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
                </div>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Basic listing in our event directory
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Standard image display
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Regular listing in event categories
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Event Listing Question */}
        {!showThankYou && selectedPromotion && hasListedElsewhere === null && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  3
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Step 2: Event Listing Status
              </h2>
              <p className="text-gray-600">
                Have you already listed your event elsewhere?
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Is your event already listed on Eventbrite, Meetup.com, or
                  your own website?
                </h3>
                <p className="text-gray-600 mb-6">
                  This helps us determine the best way to collect your event
                  information
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <button
                  onClick={() => handleListedElsewhere("yes")}
                  className="p-6 border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 text-left group"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-6 h-6 border-2 border-blue-500 rounded-full mr-3 group-hover:bg-blue-500 transition-colors duration-300"></div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      Yes, I have
                    </h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    My event is already listed on Eventbrite, Meetup, or my
                    website. I just need to provide the URL and image.
                  </p>
                </button>

                <button
                  onClick={() => handleListedElsewhere("no")}
                  className="p-6 border-2 border-gray-200 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 text-left group"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-6 h-6 border-2 border-gray-500 rounded-full mr-3 group-hover:bg-gray-500 transition-colors duration-300"></div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      No, I haven't
                    </h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    I need to provide all the event details. I'll fill out the
                    complete form.
                  </p>
                </button>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={resetFlow}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-300"
                >
                  ← Back to promotion options
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Form Section */}
        {!showThankYou && showForm && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  3
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Step 3: Event Information
              </h2>
              <p className="text-gray-600">
                {hasListedElsewhere === "yes"
                  ? "Provide your event URL and image"
                  : "Fill out your event details"}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {hasListedElsewhere === "yes" ? (
                  // Simple form for events already listed elsewhere
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                      <label className="font-medium text-gray-700">
                        Event URL *
                      </label>
                      <input
                        type="url"
                        name="event-url"
                        required
                        placeholder="https://www.eventbrite.com/..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                      <label className="font-medium text-gray-700">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        name="company-name"
                        required
                        minLength="2"
                        maxLength="100"
                        placeholder="e.g., Hamptons Beach Club, Local Restaurant"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                      <label className="font-medium text-gray-700">
                        Upload Event Image*
                      </label>
                      <input
                        type="file"
                        name="event-image"
                        required
                        accept="image/*"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                      <label className="font-medium text-gray-700">
                        Town *
                      </label>
                      <select
                        name="town"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select a town</option>
                        {towns.map((town) => (
                          <option key={town} value={town}>
                            {town}
                          </option>
                        ))}
                      </select>
                    </div>

                    {selectedPromotion === "premium" ? (
                      <>
                        <input type="hidden" name="category" value="Featured" />
                        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-center">
                          <strong>Premium Promotion:</strong> We will send you a
                          link for payment within 12 hours to your phone number.
                        </div>
                      </>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                        <label className="font-medium text-gray-700">
                          Category *
                        </label>
                        <select
                          name="category"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select a category</option>
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                      <label className="font-medium text-gray-700">
                        Contact Name *
                      </label>
                      <input
                        type="text"
                        name="contact-name"
                        required
                        minLength="2"
                        maxLength="100"
                        pattern="[A-Za-z\s\-']+"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                      <label className="font-medium text-gray-700">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                      <label className="font-medium text-gray-700">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        pattern="[0-9+\-()\s]{10,20}"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                ) : (
                  // Full form for events not listed elsewhere
                  <div className="grid grid-cols-1 gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                      <label className="font-medium text-gray-700">
                        Event Title *
                      </label>
                      <input
                        type="text"
                        name="event-title"
                        required
                        minLength="2"
                        maxLength="100"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                      <label className="font-medium text-gray-700">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        name="company-name"
                        required
                        minLength="2"
                        maxLength="100"
                        placeholder="e.g., Hamptons Beach Club, Local Restaurant"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-start">
                      <label className="font-medium text-gray-700">
                        Event Description *
                      </label>
                      <textarea
                        name="event-description"
                        required
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                      <label className="font-medium text-gray-700">
                        Start Time *
                      </label>
                      <input
                        type="datetime-local"
                        name="start-time"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                      <label className="font-medium text-gray-700">
                        End Time *
                      </label>
                      <input
                        type="datetime-local"
                        name="end-time"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                      <label className="font-medium text-gray-700">
                        Upload Event Image *
                      </label>
                      <input
                        type="file"
                        name="event-image"
                        required
                        accept="image/*"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                      <label className="font-medium text-gray-700">
                        Town *
                      </label>
                      <select
                        name="town"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select a town</option>
                        {towns.map((town) => (
                          <option key={town} value={town}>
                            {town}
                          </option>
                        ))}
                      </select>
                    </div>

                    {selectedPromotion === "premium" ? (
                      <>
                        <input type="hidden" name="category" value="Featured" />
                        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-center">
                          <strong>Premium Promotion:</strong> We will send you a
                          link for payment within 12 hours to your phone number.
                        </div>
                      </>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                        <label className="font-medium text-gray-700">
                          Category *
                        </label>
                        <select
                          name="category"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select a category</option>
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                      <label className="font-medium text-gray-700">
                        Cost *
                      </label>
                      <input
                        type="text"
                        name="cost"
                        required
                        placeholder="e.g., Free, $20, $50-100"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                      <label className="font-medium text-gray-700">
                        Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                      <label className="font-medium text-gray-700">
                        Registration URL
                      </label>
                      <input
                        type="url"
                        name="registration-url"
                        placeholder="e.g., Eventbrite link"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                      <label className="font-medium text-gray-700">
                        Contact Name *
                      </label>
                      <input
                        type="text"
                        name="contact-name"
                        required
                        minLength="2"
                        maxLength="100"
                        pattern="[A-Za-z\s\-']+"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                      <label className="font-medium text-gray-700">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                      <label className="font-medium text-gray-700">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        pattern="[0-9+\-()\s]{10,20}"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={resetFlow}
                    className="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors duration-300"
                  >
                    ← Start Over
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Event"}
                  </button>
                </div>
              </form>

              <style jsx>{`
                @keyframes fadeIn {
                  from {
                    opacity: 0;
                    transform: translateY(-10px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
                .animate-fade-in {
                  animation: fadeIn 0.5s ease-in-out;
                }
              `}</style>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ListEventPage
