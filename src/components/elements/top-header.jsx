import React from "react"
import MenuDropdown from "./menu-dropdown"
import { SITE } from "../../lib/config"

// Import SVG component as needed
// import Search01 from '../../assets/svgs/search-01';
// import ThemeController from '../bases/theme-controller';

const TopHeader = () => {
  return (
    <div className="navbar border-b border-primary-content/80 dark:border-primary-content/20">
      <div className="container mx-auto px-2 md:px-4">
        <div className="flex w-full min-h-16">
          {/* Mobile Menu and Title */}
          <div className="navbar-start lg:w-1/2">
            <MenuDropdown />
          </div>

          {/* Mobile and Desktop Title */}
          <div className="navbar-center">
            <a
              className="text-xl sm:text-xl px-2 text-nowrap font-semibold"
              href="/"
            >
              {SITE.title}
            </a>
          </div>

          {/* Right Side Icons */}
          <div className="navbar-end">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:flex gap-2">
                <a href="/promote-event" className="btn btn-outline btn-sm">
                  List a Thing
                </a>
                <a href="/sponsor" className="btn btn-primary btn-sm">
                  Become a Sponsor
                </a>
              </div>
              {/* Commented out components */}
              {/* <ThemeController /> */}
              {/* <a className="btn btn-ghost btn-circle btn-sm sm:btn-md" href="/search" aria-label="Search">
                                <Search01 size="16" />
                            </a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopHeader
