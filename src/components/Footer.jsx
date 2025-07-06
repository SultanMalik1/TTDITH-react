import React from "react"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-4 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">
              Things to Do in The Hamptons
            </h3>
            <p className="text-gray-400">
              Discover the best experiences in The Hamptons
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/events"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="/sponsor"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Sponsor us
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  About us
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="mailto:ssaldivar@thingstodointhehamptons.com"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Email Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Things to Do in The Hamptons. All
            rights reserved.
          </p>
          <p className="text-gray-500 text-sm italic mt-2">
            Website built by{" "}
            <a
              href="https://www.linkedin.com/in/santiagosaldivar/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
            >
              Santiago Saldivar
            </a>{" "}
            and{" "}
            <a
              href="https://www.linkedin.com/in/smalikk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
            >
              Sultan Malik
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
