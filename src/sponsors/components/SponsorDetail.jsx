import React from 'react';

const SponsorDetail = ({ sponsor }) => (
  <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-200 mt-8">
    <div className="flex flex-col items-center text-center">
      <img src={sponsor.logo} alt={sponsor.name} className="w-40 h-40 object-contain mb-4" />
      <h1 className="text-3xl font-bold mb-2 text-gray-900">{sponsor.name}</h1>
      <p className="text-lg text-gray-700 mb-4">{sponsor.longDescription}</p>
      <a
        href={sponsor.website}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Visit Website
      </a>
    </div>
  </div>
);

export default SponsorDetail; 