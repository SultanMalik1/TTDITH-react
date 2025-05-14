import React from 'react';
import { useParams } from 'react-router-dom';
import sponsors from '../data/sponsors.json';
import SponsorDetail from '../components/SponsorDetail';

const SponsorDetailPage = () => {
  const { sponsorId } = useParams();
  const sponsor = sponsors.find((s) => s.id === sponsorId);
  return sponsor ? <SponsorDetail sponsor={sponsor} /> : <div className="text-center mt-12 text-xl text-gray-600">Sponsor not found.</div>;
};

export default SponsorDetailPage; 