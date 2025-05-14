import React, { useState } from 'react';

const SponserUsPage = () => {
  const [showThankYou, setShowThankYou] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    try {
      await fetch('/', {
        method: 'POST',
        body: formData,
      });
      form.reset();
      setShowThankYou(true);
      setTimeout(() => {
        const thankYouElement = document.getElementById('thank-you-message');
        if (thankYouElement) {
          thankYouElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      setTimeout(() => {
        setShowThankYou(false);
      }, 5000);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit form. Please try again later.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Sponsor Us</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Want to promote your business and events in the Hamptons with actual results?
          We're more than just a local guide—we're your seasonal marketing partner.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Cottage Sponsor */}
        <div className="p-6 rounded-2xl shadow-lg transition-all hover:shadow-xl bg-white border border-gray-200">
          <h3 className="text-2xl font-semibold mb-4 text-gray-900">🏡 Cottage Sponsor</h3>
          <p className="text-2xl font-bold mb-6 text-blue-600">$50/month</p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✓</span>
              <span className="text-gray-700"><strong>Listing:</strong> Your business name featured on our platform.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✓</span>
              <span className="text-gray-700"><strong>Badge:</strong> A special sponsor badge to highlight your support.</span>
            </li>
          </ul>
        </div>

        {/* Bayfront Sponsor */}
        <div className="p-6 rounded-2xl shadow-lg transition-all hover:shadow-xl bg-white border border-gray-200">
          <h3 className="text-2xl font-semibold mb-4 text-gray-900">🌅 Bayfront Sponsor</h3>
          <p className="text-2xl font-bold mb-6 text-blue-600">$300/month</p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✓</span>
              <span className="text-gray-700"><strong>Includes all features of Cottage Sponsor</strong></span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✓</span>
              <span className="text-gray-700">20% off all advertisements throughout the month</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✓</span>
              <span className="text-gray-700">Enhanced exposure with a featured spot</span>
            </li>
          </ul>
        </div>

        {/* Oceanside Sponsor */}
        <div className="p-6 rounded-2xl shadow-lg transition-all hover:shadow-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-gray-200">
          <h3 className="text-2xl font-semibold mb-4 text-gray-900">🌊 Oceanside Sponsor</h3>
          <p className="text-2xl font-bold mb-6 text-blue-600">$1000/month</p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✓</span>
              <span className="text-gray-700"><strong>Includes all features of Bayfront Sponsor</strong></span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✓</span>
              <span className="text-gray-700">Two free ads per month (2 days each)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✓</span>
              <span className="text-gray-700">Event uploads to top Hamptons platforms:</span>
            </li>
            <ul className="ml-6 space-y-1">
              <li className="text-gray-700">• Dan's Papers</li>
              <li className="text-gray-700">• 27east</li>
              <li className="text-gray-700">• Hamptons.com</li>
              <li className="text-gray-700">• And more...</li>
            </ul>
          </ul>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <form
          name="sponsor"
          method="POST"
          data-netlify="true"
          encType="multipart/form-data"
          className="space-y-6 p-8 bg-white rounded-2xl shadow-lg border border-gray-200"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="sponsor" />
          <input type="hidden" name="recipient" value="santiagosaldivar19@gmail.com" />
          <input type="hidden" name="subject" value="New Sponsorship Interest" />

          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
            <label className="font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              name="company"
              required
              minLength="2"
              maxLength="100"
              pattern="[A-Za-z0-9\s\-&]+"
              title="Please enter a valid company name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
            <label className="font-medium text-gray-700">Contact Name</label>
            <input
              type="text"
              name="name"
              required
              minLength="2"
              maxLength="100"
              pattern="[A-Za-z\s\-']+"
              title="Please enter a valid name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
            <label className="font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="Please enter a valid email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
            <label className="font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              required
              pattern="[0-9+\-()\s]{10,20}"
              title="Please enter a valid phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
            <label className="font-medium text-gray-700">Company Logo/Image</label>
            <input
              type="file"
              name="sponsor-image"
              accept="image/png,image/jpeg"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div className="flex justify-end">
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
            >
              Submit Interest
            </button>
          </div>
        </form>

        {showThankYou && (
          <div 
            id="thank-you-message"
            className="mt-8 p-6 bg-green-50 text-green-800 rounded-lg text-center border border-green-200 transform transition-all duration-500 ease-in-out animate-fade-in"
            style={{
              animation: 'fadeIn 0.5s ease-in-out',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
          >
            <div className="flex items-center justify-center mb-3">
              <svg className="w-8 h-8 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <h3 className="text-xl font-bold">Thank You!</h3>
            </div>
            <p className="text-green-700">We've received your sponsorship interest and will get back to you shortly.</p>
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
      </div>
    </div>
  );
};

export default SponserUsPage;
