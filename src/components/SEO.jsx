import React from "react"
import { Helmet } from "react-helmet-async"

const SEO = ({
  title,
  description,
  image,
  url,
  type = "website",
  keywords = "",
  author = "Things to Do in the Hamptons",
  publishedTime,
  modifiedTime,
  section,
  tags = [],
}) => {
  const siteName = "Things to Do in the Hamptons"
  const siteUrl = "https://thingstodointhehamptons.com" // Update with your actual domain
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl
  const fullImage = image
    ? image.startsWith("http")
      ? image
      : `${siteUrl}${image}`
    : `${siteUrl}/logo.PNG`

  const fullTitle = title ? `${title} | ${siteName}` : siteName
  const fullDescription =
    description ||
    "Discover the best events, activities, and things to do in the Hamptons. From art galleries to beach activities, find your perfect Hamptons experience."
  const fullKeywords =
    keywords ||
    "things to do in the hamptons, hamptons events, hamptons activities, east hampton, southampton, montauk, hamptons nightlife, hamptons restaurants, hamptons art galleries, hamptons beaches"

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@hamptonsevents" />{" "}
      {/* Update with your Twitter handle */}
      {/* Article specific meta tags */}
      {type === "article" && (
        <>
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      {/* Additional SEO Meta Tags */}
      <meta name="geo.region" content="US-NY" />
      <meta name="geo.placename" content="The Hamptons, New York" />
      <meta name="geo.position" content="40.9634;-72.1848" />
      <meta name="ICBM" content="40.9634, -72.1848" />
      {/* Structured Data for Events */}
      {type === "article" && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: title,
            description: description,
            image: fullImage,
            url: fullUrl,
            location: {
              "@type": "Place",
              name: "The Hamptons",
              address: {
                "@type": "PostalAddress",
                addressRegion: "NY",
                addressCountry: "US",
              },
            },
            organizer: {
              "@type": "Organization",
              name: siteName,
              url: siteUrl,
            },
          })}
        </script>
      )}
      {/* Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteName,
          url: siteUrl,
          logo: `${siteUrl}/logo.PNG`,
          description: fullDescription,
          sameAs: [
            "https://www.facebook.com/thingstodointhehamptons",
            "https://www.instagram.com/thingstodointhehamptons",
            "https://twitter.com/hamptonsevents",
          ],
        })}
      </script>
      {/* Website Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteName,
          url: siteUrl,
          description: fullDescription,
          potentialAction: {
            "@type": "SearchAction",
            target: `${siteUrl}/events?search={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        })}
      </script>
    </Helmet>
  )
}

export default SEO
