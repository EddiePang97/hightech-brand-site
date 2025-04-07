// src/components/Footer.tsx
import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-[#c8d8e1] px-6 py-10 text-sm text-gray-800">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-start">
        {/* Contact Form */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-blue-800">Become Our Valued Partner</h2>
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 bg-gray-300 placeholder-black"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 bg-gray-300 placeholder-black"
          />
          <textarea
            placeholder="Message"
            className="w-full p-2 bg-gray-300 placeholder-black h-24"
          />
          <button className="bg-[#414567] text-white px-6 py-2 uppercase text-xs">Send a Request</button>
        </div>

        {/* GET IN TOUCH + Info */}
        <div className="flex flex-col items-start justify-between h-full">
          <img
            src="/assets/image.png"
            alt="Get in Touch"
            className="w-72 mb-4"
          />
          <div className="text-blue-800 space-y-1">
            <p><strong>Address:</strong> JIASHUO Building</p>
            <p><strong>Email:</strong> JIASHUO@Gmail.Com</p>
            <p><strong>Tel:</strong> 65 68887888</p>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="text-center text-xs mt-10 text-black/80">
        © Copyright 1949 Singapore 2025. All Rights Reserved.
      </div>
    </footer>
  )
}