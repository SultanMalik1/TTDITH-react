import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-4 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Things to Do in The Hamptons</h3>
            <p className="text-gray-400">Discover the best experiences in The Hamptons</p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors duration-300">Home</a></li>
              <li><a href="/activities" className="text-gray-400 hover:text-white transition-colors duration-300">Activities</a></li>
              <li><a href="/dining" className="text-gray-400 hover:text-white transition-colors duration-300">Dining</a></li>
              <li><a href="/events" className="text-gray-400 hover:text-white transition-colors duration-300">Events</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <ul className="space-y-2">
              <li><a href="mailto:info@thingstodointhehamptons.com" className="text-gray-400 hover:text-white transition-colors duration-300">Email Us</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white transition-colors duration-300">About Us</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Things to Do in The Hamptons. All rights reserved.</p>
          <p className="text-gray-500 text-sm italic mt-2">Website built by Santiago Saldivar and Sultan Malik</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 