"use client";

export default function ContactSection() {
  return (
    <div className="w-full bg-white py-24 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-amber-500"></div>
            <span className="text-amber-600 tracking-[0.3em] text-sm font-medium uppercase">
              Get In Touch
            </span>
            <div className="h-[1px] w-12 bg-amber-500"></div>
          </div>
          <h2 className="text-5xl md:text-7xl font-sans font-medium text-gray-900 leading-none tracking-tight">
            Contact Us
          </h2>
          <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mt-6 font-light">
            We'd love to hear from you. Reach out to us for any inquiries.
          </p>
        </div>

        {/* Contact Information */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Email */}
            <div className="flex flex-col items-center text-center p-8 rounded-xl bg-gray-50 hover:shadow-lg transition-all duration-300 group">
              <div className="text-amber-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <h4 className="font-sans text-xl text-gray-900 mb-3">Email</h4>
              <a
                href="mailto:info@lakeviewhomes.co.in"
                className="text-gray-600 hover:text-amber-600 transition-colors text-sm"
              >
                info@lakeviewhomes.co.in
              </a>
            </div>

            {/* Phone */}
            <div className="flex flex-col items-center text-center p-8 rounded-xl bg-gray-50 hover:shadow-lg transition-all duration-300 group">
              <div className="text-amber-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
              </div>
              <h4 className="font-sans text-xl text-gray-900 mb-3">Phone</h4>
              <a
                href="tel:+919441363666"
                className="text-gray-600 hover:text-amber-600 transition-colors text-sm"
              >
                +91 94413 63666
              </a>
            </div>

            {/* Address */}
            <div className="flex flex-col items-center text-center p-8 rounded-xl bg-gray-50 hover:shadow-lg transition-all duration-300 group">
              <div className="text-amber-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10"
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
              </div>
              <h4 className="font-sans text-xl text-gray-900 mb-3">Address</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Beside Sri Venkateswara Swamy Temple,
                <br />
                Kolamuru Diwancheruvu Rd,
                <br />
                Rayudu Pakalu, 533102
              </p>
            </div>

            {/* Instagram */}
            <div className="flex flex-col items-center text-center p-8 rounded-xl bg-gray-50 hover:shadow-lg transition-all duration-300 group">
              <div className="text-amber-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-10 h-10"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
              <h4 className="font-sans text-xl text-gray-900 mb-3">
                Instagram
              </h4>
              <a
                href="https://instagram.com/mvr.lakeview.homes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-amber-600 transition-colors text-sm"
              >
                @mvr.lakeview.homes
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
