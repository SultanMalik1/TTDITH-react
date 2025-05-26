/**
 * @typedef {Object} Link
 * @property {string} href - URL of the link
 * @property {string} text - Display text for the link
 * @property {string} [icon] - Optional icon name
 */

export const SITE = {
  title: "Things to Do in the Hamptons",
  description:
    "A comprehensive guide to events and activities happening throughout the Hamptons",
  author: "Santiago Saldivar",
  url: "https://www.thingstodointhehamptons.com",
  github: "/",
  locale: "en-US",
  dir: "ltr",
  charset: "UTF-8",
  basePath: "/",
  postsPerPage: 9, // Matches EVENTS_PER_PAGE from your existing code
}

/** @type {Link[]} */
export const NAVIGATION_LINKS = [
  {
    href: "/featured",
    text: "Featured Things",
  },
  {
    href: "/events/1",
    text: "All Things",
  },
  {
    href: "/categories/Community/1",
    text: "Community",
  },
  {
    href: "/categories/Government/1",
    text: "Government",
  },
  {
    href: "/categories/Nature/1",
    text: "Nature",
  },
  {
    href: "/categories/Library/1",
    text: "Library",
  },
  {
    href: "/categories/Arts/1",
    text: "Arts",
  },
  {
    href: "/categories/Music/1",
    text: "Music",
  },
  {
    href: "/categories/Health/1",
    text: "Health",
  },
  {
    href: "/categories/Restaurant/1",
    text: "Restaurant",
  },
  {
    href: "/categories/Film/1",
    text: "Film",
  },
  {
    href: "/categories/Nightlife/1",
    text: "Nightlife",
  },
  {
    href: "/categories/Spiritual/1",
    text: "Spiritual",
  },
]

/** @type {Link[]} */
export const FOOTER_LINKS = [
  {
    href: "/about",
    text: "About Us",
  },
  {
    href: "/sponsors",
    text: "Our Sponsors",
  },
  {
    href: "/contact",
    text: "Contact Us",
  },
  {
    href: "/list-event",
    text: "List an Event",
  },
  {
    href: "/sponsor",
    text: "Become a Sponsor",
  },
]

/** @type {Link[]} */
export const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/thingstodointhehamptons",
    text: "Instagram",
    icon: "instagram",
  },
  {
    href: "https://www.facebook.com/thingstodointhehamptons",
    text: "Facebook",
    icon: "facebook",
  },
]

// Export the category names to use consistently throughout the app
export const CATEGORIES = [
  "Nature",
  "Government",
  "Arts",
  "Music",
  "Restaurant",
  "Community",
  "Film",
  "Library",
  "Health",
  "Nightlife",
  "Spiritual",
]
