"use client";

export default function MapSection() {
  return (
    <div className="w-full bg-white py-24 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-amber-500"></div>
            <span className="text-amber-600 tracking-[0.3em] text-sm font-medium uppercase">
              Find Us
            </span>
            <div className="h-[1px] w-12 bg-amber-500"></div>
          </div>
          <h2 className="text-5xl md:text-7xl font-sans font-medium text-gray-900 leading-none tracking-tight">
            Location
          </h2>
          <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mt-6 font-light">
            Visit us at our exclusive location.
          </p>
        </div>

        {/* Map Container */}
        <div className="w-[90%] mx-auto h-[400px] md:h-[400px] rounded-xl overflow-hidden shadow-xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3825.4!2d81.835167!3d17.064056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDAzJzUwLjYiTiA4McKwNTAnMDYuNiJF!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
          ></iframe>
        </div>

        {/* Address or Additional Info */}
        <div className="text-center mt-12">
          <a
            href="https://maps.app.goo.gl/SVk9YGSXKuGuXgP7A"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-900 hover:text-amber-600 transition-colors duration-300 font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            Open in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
