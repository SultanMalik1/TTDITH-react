import React from "react"

const SponsorDetail = ({ sponsor }) => {
  // Define badge colors based on tier
  const tierBadges = {
    waterfront: "bg-amber-100 text-amber-800",
    bayside: "bg-slate-100 text-slate-800",
    cottage: "bg-orange-100 text-orange-800",
  }

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Left column - Sponsor info */}
        <div className="w-full md:w-1/3">
          <div className="sticky top-20">
            <div className="aspect-square rounded-lg overflow-hidden mb-4 flex items-center justify-center">
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="w-auto h-auto object-cover"
              />
            </div>

            <div className="flex items-center gap-2 mb-4">
              <h1 className="text-2xl font-bold">{sponsor.name}</h1>
              {sponsor.tier && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    tierBadges[sponsor.tier] || "bg-gray-100 text-gray-800"
                  }`}
                >
                  {sponsor.tier.charAt(0).toUpperCase() + sponsor.tier.slice(1)}
                </span>
              )}
            </div>

            {sponsor.business && (
              <p className="text-lg font-medium mb-2">{sponsor.business}</p>
            )}

            <div className="mt-4">
              <a
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors block text-center mb-4"
              >
                Visit Website
              </a>

              {sponsor.social && sponsor.social.length > 0 && (
                <div className="flex gap-3 mt-4">
                  {sponsor.social.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      aria-label={link.name}
                    >
                      {/* Replace with your icon component or use basic text */}
                      {link.icon || link.name.charAt(0)}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right column - Content with Medium-like sections */}
        <div className="w-full md:w-2/3">
          <article className="prose max-w-none">
            {/* About Section */}
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">About</h2>
            <p className="text-lg text-gray-700 mb-8">
              {sponsor.longDescription ||
                "Information about this sponsor coming soon."}
            </p>

            {/* Why Support Section */}
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">
              Why Support Us
            </h2>
            <div className="mb-8">
              <blockquote className="border-l-4 border-blue-500 pl-4 py-2 italic bg-gray-50 rounded-r-lg relative">
                <span className="text-4xl text-blue-400 absolute top-0 left-2 leading-none">
                  "
                </span>
                <p className="text-lg text-gray-700 pl-5 pr-4">
                  {sponsor.whySupport ||
                    "Supporting Things to Do in The Hamptons helps connect our community with local businesses and experiences."}
                </p>
                <span className="text-4xl text-blue-400 absolute bottom-0 right-4 leading-none">
                  "
                </span>
              </blockquote>
            </div>

            {/* Services Section */}
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Services</h2>
            {sponsor.services && sponsor.services.length > 0 ? (
              <ul className="list-disc pl-5 mb-8">
                {sponsor.services.map((service, index) => (
                  <li key={index} className="text-lg text-gray-700 mb-2">
                    {service}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-lg text-gray-700 mb-8">
                Services information coming soon.
              </p>
            )}

            {/* Visit Us Section */}
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Visit Us</h2>
            <div className="text-lg text-gray-700 mb-8">
              {sponsor.address && <p className="mb-2">{sponsor.address}</p>}
              {sponsor.hours && <p className="mb-2">Hours: {sponsor.hours}</p>}
              {sponsor.phone && <p className="mb-2">Phone: {sponsor.phone}</p>}
              {sponsor.email && <p className="mb-2">Email: {sponsor.email}</p>}
              {sponsor.website && (
                <p className="mb-2">Site: {sponsor.website}</p>
              )}
            </div>
          </article>
        </div>
      </div>

      {/* Become a sponsor section */}
      <div className="border-t pt-8 mt-8">
        <h3 className="text-xl font-bold mb-2">Become a Sponsor?</h3>
        <a
          href="/sponsor"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block"
        >
          Learn More
        </a>
      </div>
    </div>
  )
}

export default SponsorDetail
