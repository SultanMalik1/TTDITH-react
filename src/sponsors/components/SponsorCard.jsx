import React from 'react';
import { Link } from 'react-router-dom';

const SponsorCard = ({ sponsor }) => (
  <div className="p-6 rounded-2xl shadow-lg bg-white border border-gray-200 flex flex-col items-center text-center">
    <img src={sponsor.logo} alt={sponsor.name} className="w-28 h-28 object-contain mb-4" />
    <h3 className="text-xl font-semibold mb-2 text-gray-900">{sponsor.name}</h3>
    <p className="text-gray-600 mb-4">{sponsor.shortDescription}</p>
    <Link
      to={`/sponsors/${sponsor.id}`}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
    >
      View Details
    </Link>
  </div>
);

export default SponsorCard; 