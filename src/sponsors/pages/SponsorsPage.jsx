import React from 'react';
import sponsors from '../data/sponsors.json';
import SponsorCategoryList from '../components/SponsorCategoryList';

const SponsorsPage = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
    <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Sponsors</h1>
    <SponsorCategoryList sponsors={sponsors} />
  </div>
);

export default SponsorsPage; 