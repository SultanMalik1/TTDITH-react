import React from "react"
import { useNavigate } from "react-router-dom"
import SEO from "../components/SEO"

const FAQPage = () => {
  const navigate = useNavigate()

  const faqs = [
    {
      question: "What are the best things to do in the Hamptons?",
      answer:
        "The Hamptons offer a wide variety of activities including beach activities, art galleries, fine dining, outdoor recreation, and cultural events. Popular activities include visiting the beaches in Montauk, exploring art galleries in East Hampton, dining at world-class restaurants, and attending summer events and festivals.",
    },
    {
      question: "What events are happening in the Hamptons today?",
      answer:
        "We maintain an up-to-date calendar of events happening across all Hamptons towns. You can browse today's events on our homepage or use our date filter to find events on any specific date. From art openings to live music, there's always something happening in the Hamptons.",
    },
    {
      question: "What are the best restaurants in the Hamptons?",
      answer:
        "The Hamptons are known for their exceptional dining scene. Popular areas include Main Street in East Hampton, Jobs Lane in Southampton, and the village of Sag Harbor. From casual beachside dining to upscale farm-to-table restaurants, there are options for every taste and budget.",
    },
    {
      question: "What beaches should I visit in the Hamptons?",
      answer:
        "Some of the most popular beaches include Main Beach in East Hampton, Coopers Beach in Southampton, and Ditch Plains in Montauk. Each beach offers different experiences - from family-friendly spots to surfing destinations. Many beaches require permits during peak season.",
    },
    {
      question: "What art galleries are worth visiting in the Hamptons?",
      answer:
        "The Hamptons have a thriving art scene with galleries in East Hampton, Southampton, and Sag Harbor. Notable areas include Newtown Lane in East Hampton and Jobs Lane in Southampton. Many galleries host opening receptions and special events throughout the summer.",
    },
    {
      question: "What outdoor activities are available in the Hamptons?",
      answer:
        "Outdoor enthusiasts can enjoy surfing, paddleboarding, kayaking, hiking, golf, tennis, and fishing. The area offers beautiful nature preserves, state parks, and water activities. Montauk is particularly popular for surfing and fishing.",
    },
    {
      question: "What's the best time to visit the Hamptons?",
      answer:
        "Summer (June-August) is peak season with the most events and activities, but spring and fall offer pleasant weather with fewer crowds. Winter is quieter but still offers cultural events, dining, and beautiful scenery. Each season has its unique charm.",
    },
    {
      question: "How do I get around the Hamptons?",
      answer:
        "While having a car is most convenient, there are also train services from NYC to various Hamptons towns, local taxi services, and some public transportation options. Many areas are walkable once you're in town, and biking is popular in the summer.",
    },
    {
      question: "What family-friendly activities are available?",
      answer:
        "Families can enjoy beaches, children's museums, mini-golf, ice cream shops, and family-oriented events. Many restaurants are family-friendly, and there are numerous parks and playgrounds throughout the area.",
    },
    {
      question: "What nightlife options are available in the Hamptons?",
      answer:
        "The Hamptons offer a range of nightlife from casual bars to upscale clubs. Popular areas include Montauk for a more laid-back vibe, and various towns have bars and restaurants with live music. Summer brings many special events and parties.",
    },
    {
      question: "Are there any free activities in the Hamptons?",
      answer:
        "Yes! Many beaches offer free access (though some require permits), there are free concerts and events throughout the summer, hiking trails, and beautiful scenic drives. Many galleries offer free admission, and there are often free community events.",
    },
    {
      question: "What cultural events happen in the Hamptons?",
      answer:
        "The Hamptons host numerous cultural events including film festivals, art shows, music festivals, theater performances, and literary events. The summer season is particularly rich with cultural programming across all towns.",
    },
  ]

  return (
    <>
      <SEO
        title="FAQ - Things to Do in the Hamptons | Common Questions Answered"
        description="Find answers to frequently asked questions about things to do in the Hamptons. From beaches and restaurants to events and activities, get expert advice for your Hamptons visit."
        keywords="hamptons faq, things to do hamptons questions, hamptons travel guide, hamptons activities, hamptons events, hamptons beaches, hamptons restaurants"
        faqData={faqs}
      />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Everything you need to know about things to do in the Hamptons
          </p>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-blue-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Explore the Hamptons?
          </h2>
          <p className="text-gray-700 mb-6">
            Browse our complete event calendar and discover amazing activities
            happening today and this weekend.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/events/1")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Browse All Events
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Back to Homepage
            </button>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-12 bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Additional Resources
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                📅 Event Planning
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  •{" "}
                  <button
                    onClick={() => navigate("/events/1")}
                    className="text-blue-600 hover:underline"
                  >
                    Browse all events
                  </button>
                </li>
                <li>
                  •{" "}
                  <button
                    onClick={() => navigate("/featured")}
                    className="text-blue-600 hover:underline"
                  >
                    Featured activities
                  </button>
                </li>
                <li>
                  •{" "}
                  <button
                    onClick={() => navigate("/categories/Arts/1")}
                    className="text-blue-600 hover:underline"
                  >
                    Arts & culture events
                  </button>
                </li>
                <li>
                  •{" "}
                  <button
                    onClick={() => navigate("/categories/Nature/1")}
                    className="text-blue-600 hover:underline"
                  >
                    Outdoor activities
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                🏖️ Popular Activities
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Beach activities and water sports</li>
                <li>• Art gallery tours and exhibitions</li>
                <li>• Fine dining and local restaurants</li>
                <li>• Live music and entertainment</li>
                <li>• Shopping and boutiques</li>
                <li>• Golf and tennis</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FAQPage
