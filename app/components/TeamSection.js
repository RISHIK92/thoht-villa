"use client";

export default function TeamSection() {
  const teamMembers = [
    {
      name: "Ar. Sri Polina",
      role: "Lead Architect",
      company: "ThōhT Design Studio",
      website: "www.thoht.in",
    },
    {
      name: "Polina V S",
      role: "Managing Partner",
      company: "Sri Sitara Constructions",
    },
    {
      name: "Er. D.S. Ramesh Varma",
      role: "Structural Consultant",
      company: "SRV Consultants",
      email: "srvconsultants.rjy@gmail.com",
    },
    {
      name: "Er. D.S. Kiran Varma",
      role: "Project Manager",
      company: "SRV Consultants",
      email: "srvconsultants.rjy@gmail.com",
    },
  ];

  return (
    <div className="w-full bg-white py-24 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-amber-500"></div>
            <span className="text-amber-600 tracking-[0.3em] text-sm font-medium uppercase">
              Meet The Team
            </span>
            <div className="h-[1px] w-12 bg-amber-500"></div>
          </div>
          <h2 className="text-5xl md:text-7xl font-sans font-medium text-gray-900 leading-none tracking-tight">
            Our Team
          </h2>
          <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mt-6 font-light">
            A dedicated group of professionals committed to creating exceptional
            living spaces.
          </p>
        </div>

        {/* Team Image */}
        <div className="mb-12">
          <img
            src="/logos-our-team.png"
            alt="Our Team"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Team Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`text-center p-6 bg-white transition-all duration-500 hover:shadow-xl ${
                member.name === "Polina V S" ? "order-first md:order-none" : ""
              }`}
            >
              <h3 className="text-xl font-sans font-medium mb-1 text-gray-900">
                {member.name}
              </h3>
              <p className="text-amber-600 text-sm tracking-widest uppercase font-medium mb-2">
                {member.role}
              </p>
              {member.company && (
                <p className="text-gray-500 text-xs mt-1">{member.company}</p>
              )}
              {member.website && (
                <a
                  className="text-gray-500 text-xs mt-1 block hover:text-amber-600 transition-colors"
                  href={`https://${member.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {member.website}
                </a>
              )}
              {member.email && (
                <p className="text-gray-500 text-xs mt-1">{member.email}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
