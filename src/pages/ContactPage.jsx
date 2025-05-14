import React from 'react';

const ContactPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-5xl font-extrabold mb-4 text-center">Contact Us</h1>
      <p className="text-lg text-gray-600 mb-10 text-center max-w-2xl mx-auto">
        We'd love to hear your suggestions on how to improve this events website or learn about what types of events interest you.
      </p>
      <div className="flex justify-center">
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-10 w-full max-w-xl"
        >
          {/* Netlify form hidden inputs */}
          <input type="hidden" name="form-name" value="contact" />
          <div hidden>
            <input name="bot-field" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6 items-center mb-6">
            <label className="font-medium text-gray-700 md:text-right" htmlFor="name">Name</label>
            <input 
              id="name"
              type="text" 
              name="name" 
              required 
              minLength="2"
              maxLength="100"
              pattern="[A-Za-z\s\-']+"
              title="Please enter a valid name (letters, spaces, hyphens, and apostrophes only)"
              className="input input-bordered w-full border-2 border-gray-400 bg-gray-50 shadow-sm focus:border-[#6C47FF] focus:bg-white" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6 items-center mb-6">
            <label className="font-medium text-gray-700 md:text-right" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="Please enter a valid email address"
              className="input input-bordered w-full border-2 border-gray-400 bg-gray-50 shadow-sm focus:border-[#6C47FF] focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6 items-start mb-8">
            <label className="font-medium text-gray-700 md:text-right pt-2" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              required
              minLength="10"
              maxLength="1000"
              title="Please enter a message between 10 and 1000 characters"
              className="textarea textarea-bordered w-full border-2 border-gray-400 bg-gray-50 shadow-sm focus:border-[#6C47FF] focus:bg-white"
              rows="5"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="btn bg-[#6C47FF] hover:bg-[#4B2ED8] text-white px-6 py-2 rounded font-semibold shadow-sm">Send Message</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
