import React from "react"
import { useLocation } from "react-router-dom"
import { SITE } from "../lib/config"

// ShareItem component for individual share buttons
const ShareItem = ({ className, title, socialShare, url, text, icon }) => {
  return (
    <button
      className={`w-8 h-8 flex items-center justify-center rounded-full ${className}`}
      title={title}
      data-aw-social-share={socialShare}
      data-aw-url={url}
      data-aw-text={text}
    >
      {/* You can replace this with actual icons */}
      <span>{icon}</span>
    </button>
  )
}

// Main Share component
const Share = ({ text }) => {
  const location = useLocation()
  const pathname = location.pathname
  const siteUrl = SITE.url || window.location.origin
  const fullUrl = `${siteUrl}${pathname}`

  // Add share functionality script
  React.useEffect(() => {
    const handleSocialShare = () => {
      document.querySelectorAll("[data-aw-social-share]").forEach((item) => {
        const share = item.dataset.awSocialShare
        const url = encodeURIComponent(
          item.dataset.awUrl || window.location.href
        )
        const text = encodeURIComponent(item.dataset.awText || "")

        item.addEventListener("click", () => {
          if (share === "facebook") {
            window.open(
              `https://www.facebook.com/sharer.php?u=${url}`,
              "facebook",
              "width=600,height=400"
            )
          } else if (share === "twitter") {
            window.open(
              `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
              "twitter",
              "width=600,height=400"
            )
          } else if (share === "linkedin") {
            window.open(
              `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`,
              "linkedin",
              "width=600,height=400"
            )
          } else if (share === "whatsapp") {
            window.open(
              `https://api.whatsapp.com/send?text=${text}%20${url}`,
              "whatsapp"
            )
          } else if (share === "clipboard") {
            navigator.clipboard
              .writeText(item.dataset.awUrl || window.location.href)
              .then(() => {
                // You could add a toast notification here
                alert("Link copied to clipboard!")

                // Alternative: use a small temporary notification
                /*
              const notification = document.createElement('div');
              notification.classList.add('fixed', 'bottom-4', 'right-4', 'px-4', 'py-2', 'bg-green-500', 'text-white', 'rounded-lg', 'shadow-lg', 'transition-opacity');
              notification.textContent = 'Link copied to clipboard!';
              document.body.appendChild(notification);
              
              setTimeout(() => {
                notification.classList.add('opacity-0');
                setTimeout(() => document.body.removeChild(notification), 500);
              }, 2000);
              */
              })
          }
        })
      })
    }

    handleSocialShare()

    // Clean up event listeners when component unmounts
    return () => {
      document.querySelectorAll("[data-aw-social-share]").forEach((item) => {
        item.replaceWith(item.cloneNode(true))
      })
    }
  }, [])

  return (
    <div className="flex gap-4">
      <ShareItem
        className="hover:bg-primary hover:text-primary-content"
        title="Copy Link"
        socialShare="clipboard"
        url={fullUrl}
        text={text}
        icon="📋"
      />
      <ShareItem
        className="hover:bg-[#3b5998] hover:text-primary-content"
        title="Facebook Share"
        socialShare="facebook"
        url={fullUrl}
        text={text}
        icon="f"
      />
      <ShareItem
        className="hover:bg-[#00acee] hover:text-primary-content"
        title="Twitter Share"
        socialShare="twitter"
        url={fullUrl}
        text={text}
        icon="t"
      />
      <ShareItem
        className="hover:bg-[#0072b1] hover:text-primary-content"
        title="LinkedIn Share"
        socialShare="linkedin"
        url={fullUrl}
        text={text}
        icon="in"
      />
      <ShareItem
        className="hover:bg-[#008000] hover:text-primary-content"
        title="WhatsApp Share"
        socialShare="whatsapp"
        url={fullUrl}
        text={text}
        icon="w"
      />
    </div>
  )
}

export default Share
