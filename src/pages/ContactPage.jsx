import React, { useState } from "react"

const ContactPage = () => {
  const [showThankYou, setShowThankYou] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)

    try {
      await fetch("/", {
        method: "POST",
        body: formData,
      })

      form.reset()
      setShowThankYou(true)
      // Scroll to thank you message
      setTimeout(() => {
        const thankYouElement = document.getElementById("thank-you-message")
        if (thankYouElement) {
          thankYouElement.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
      // Hide thank you message after 5 seconds
      setTimeout(() => {
        setShowThankYou(false)
      }, 5000)
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to submit form. Please try again later.")
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-5xl font-extrabold mb-4 text-center">Contact Us</h1>
      <p className="text-lg text-gray-600 mb-10 text-center max-w-2xl mx-auto">
        We'd love to hear your suggestions on how to improve this events website
        or learn about what types of events interest you.
      </p>
      <div className="flex justify-center">
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 w-full max-w-xl"
        >
          {/* Netlify form hidden inputs */}
          <input type="hidden" name="form-name" value="contact" />
          <div hidden>
            <input name="bot-field" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
            <label className="font-medium text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              required
              minLength="2"
              maxLength="100"
              pattern="[A-Za-z\s\-']+"
              title="Please enter a valid name (letters, spaces, hyphens, and apostrophes only)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center mt-6">
            <label className="font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="Please enter a valid email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-start mt-6">
            <label className="font-medium text-gray-700" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              minLength="10"
              maxLength="1000"
              title="Please enter a message between 10 and 1000 characters"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="5"
            ></textarea>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
            >
              Send Message
            </button>
          </div>

          {showThankYou && (
            <div
              id="thank-you-message"
              className="mt-8 p-6 bg-green-50 text-green-800 rounded-lg text-center border border-green-200 transform transition-all duration-500 ease-in-out animate-fade-in"
              style={{
                animation: "fadeIn 0.5s ease-in-out",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
            >
              <div className="flex items-center justify-center mb-3">
                <svg
                  className="w-8 h-8 text-green-500 mr-2"
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
                <h3 className="text-xl font-bold">Thank You!</h3>
              </div>
              <p className="text-green-700">
                We've received your message and will get back to you shortly.
              </p>
            </div>
          )}

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
        </form>
      </div>
    </div>
  )
}

export default ContactPage
