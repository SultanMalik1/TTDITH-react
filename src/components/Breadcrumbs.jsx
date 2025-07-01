import React from "react"
import { Link, useLocation } from "react-router-dom"

const Breadcrumbs = ({ items = [] }) => {
  const location = useLocation()

  // Generate breadcrumbs based on current path if no items provided
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname
      .split("/")
      .filter((segment) => segment)
    const breadcrumbs = [
      { name: "Home", path: "/", current: pathSegments.length === 0 },
    ]

    let currentPath = ""
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`

      // Convert segment to readable name
      let name = segment
      if (segment === "events") name = "All Events"
      else if (segment === "categories") name = "Categories"
      else if (segment === "featured") name = "Featured Events"
      else if (segment === "about") name = "About"
      else if (segment === "contact") name = "Contact"
      else if (segment === "faq") name = "FAQ"
      else if (segment === "list-event") name = "List Event"
      else if (segment === "sponsor") name = "Become a Sponsor"
      else if (segment === "sponsors") name = "Sponsors"
      else if (segment === "event") name = "Event Details"
      else if (segment === "towns") name = "Towns"
      else if (segment === "date") name = "Date"
      else {
        // Handle town slugs and other segments
        if (pathSegments[0] === "towns" && index === 1) {
          // Convert town slug to readable name
          name = segment
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        } else if (pathSegments[0] === "categories" && index === 1) {
          // Category name
          name = segment
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        } else if (
          pathSegments[0] === "events" &&
          pathSegments[1] === "date" &&
          index === 2
        ) {
          // Date format
          const [year, month, day] = segment.split("-")
          const date = new Date(year, month - 1, day)
          name = date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        } else {
          // Capitalize and format other segments
          name = segment
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        }
      }

      breadcrumbs.push({
        name,
        path: currentPath,
        current: index === pathSegments.length - 1,
      })
    })

    return breadcrumbs
  }

  const breadcrumbItems = items.length > 0 ? items : generateBreadcrumbs()

  return (
    <nav className="flex mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <svg
                className="w-4 h-4 text-gray-400 mx-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {item.current ? (
              <span className="text-gray-500 font-medium" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link
                to={item.path}
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
