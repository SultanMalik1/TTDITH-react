import React from 'react';
import SponsorCard from './SponsorCard';

const CATEGORY_LABELS = {
  oceanside: 'Oceanside Sponsors',
  bayfront: 'Bayfront Sponsors',
  cottage: 'Cottage Sponsors',
};

const SponsorCategoryList = ({ sponsors }) => {
  const grouped = sponsors.reduce((acc, sponsor) => {
    acc[sponsor.category] = acc[sponsor.category] || [];
    acc[sponsor.category].push(sponsor);
    return acc;
  }, {});

  return (
    <div className="space-y-12">
      {Object.keys(CATEGORY_LABELS).map((cat) =>
        grouped[cat] ? (
          <div key={cat}>
            <h2 className="text-2xl font-bold mb-6">{CATEGORY_LABELS[cat]}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {grouped[cat].map((sponsor) => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} />
              ))}
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};

export default SponsorCategoryList; 