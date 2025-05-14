import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-indigo-100 via-white to-pink-100">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 relative">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              About Things to Do in the Hamptons
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Learn more about our mission to showcase the best events and activities in the Hamptons.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Welcome Section */}
        <div className="prose prose-lg max-w-none mb-16">
          <p className="text-gray-700 leading-relaxed">
            Welcome to Things to Do in the Hamptons, the premier resource for discovering events, activities, and happenings throughout the Hamptons area.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is simple: to help locals and visitors alike discover the rich variety of activities and events happening in the Hamptons. From community gatherings to arts exhibitions, nature walks to restaurant specials, we curate a comprehensive collection of events to ensure you never miss out on what the Hamptons has to offer.
          </p>
        </div>

        {/* Who We Are Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
          <p className="text-gray-700 leading-relaxed">
            Founded by Santiago Saldivar and Sultan Malik, Things to Do in the Hamptons arose from a passion for the vibrant communities of Eastern Long Island. We noticed that despite the wealth of activities in the area, finding information about them was often scattered across different platforms and websites.
          </p>
        </div>

        {/* What We Offer Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What We Offer</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span className="text-gray-700"><strong>Comprehensive Event Listings</strong>: Our platform aggregates events from various sources to create the most complete listing of happenings in the Hamptons.</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span className="text-gray-700"><strong>Categorized Browsing</strong>: Easily find events by category – whether you're interested in arts, community gatherings, outdoor activities, or dining experiences.</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span className="text-gray-700"><strong>Featured Events</strong>: Our curated selection highlights not-to-miss experiences across the Hamptons.</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span className="text-gray-700"><strong>Promotional Opportunities</strong>: Event organizers can submit their events to reach our growing audience.</span>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            Have an event to share or questions about our platform? We'd love to hear from you! Visit our{' '}
            <a href="/contact" className="text-blue-600 hover:text-blue-800 underline">Contact page</a> or email us directly at{' '}
            <a href="mailto:ssaldivar@thingstodointhehamptons.com" className="text-blue-600 hover:text-blue-800 underline">
              ssaldivar@thingstodointhehamptons.com
            </a>.
          </p>
        </div>

        {/* Support Section */}
        <div className="bg-gradient-to-br from-indigo-100 to-pink-100 rounded-2xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Support Our Work</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            If you appreciate our service, consider{' '}
            <a href="/sponsor" className="text-blue-600 hover:text-blue-800 underline">
              sponsoring
            </a>{' '}
            Things to Do in the Hamptons. Your support helps us maintain and improve this community resource.
          </p>
          <a
            href="/sponsor"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
          >
            Become a Sponsor
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
