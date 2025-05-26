import React from "react"
import { NAVIGATION_LINKS } from "@/lib/config"
import NavbarItem from "../bases/navbar-item"

const Navbar = () => {
  return (
    <nav className="navbar-center hidden lg:flex container">
      <ul className="menu menu-sm menu-horizontal px-1 mx-auto">
        <NavbarItem item={{ href: "/", text: "Home" }} />
        {/* <NavbarItem item={{ href: "/articles", text: "Editorial Blog" }} /> */}
        <NavbarItem
          item={{
            href: "/categories/featured-events/1",
            text: "Featured Events",
          }}
        />
        <NavbarItem item={{ href: "/events", text: "All Events" }} />
        <NavbarItem item={{ href: "/articles", text: "Editorial Blog" }} />
        {/* <NavbarItem item={{ href: "/events", text: "All Events" }} /> */}

        <li>
          <details>
            <summary>Event Categories</summary>
            <ul className="relative z-50 bg-base-100 rounded-box shadow-lg p-2 w-35">
              {NAVIGATION_LINKS.filter(
                (link) => link.text !== "Events" && link.text !== "Our Sponsors"
              ).map(({ href, text, target }) => (
                <li key={href}>
                  <a href={href} target={target ?? "_self"} aria-label={text}>
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </li>
        <NavbarItem item={{ href: "/contact", text: "Contact Us" }} />
        <li>
          <details>
            <summary>About</summary>
            <ul className="relative z-50 bg-base-100 rounded-box shadow-lg p-2 w-35">
              <li>
                <a href="/about" target="_self" aria-label="About Us">
                  About Us
                </a>
              </li>
              <li>
                <a href="/sponsors" target="_self" aria-label="Our Sponsors">
                  Meet our Sponsors
                </a>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
