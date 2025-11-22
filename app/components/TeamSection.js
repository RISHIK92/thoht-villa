"use client";

export default function TeamSection() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Lead Architect",
      image: "/East_Day.jpg",
    },
    {
      name: "Michael Chen",
      role: "Interior Designer",
      image: "/West_Day.jpg",
    },
    {
      name: "Emma Rodriguez",
      role: "Project Manager",
      image: "/East_Night.jpg",
    },
    {
      name: "David Kim",
      role: "Senior Developer",
      image: "/West_Night.jpg",
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
          <h2 className="text-5xl md:text-7xl font-serif font-medium text-gray-900 leading-none tracking-tight">
            Our Team
          </h2>
          <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mt-6 font-light">
            A dedicated group of professionals committed to creating exceptional
            living spaces.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative overflow-hidden bg-white transition-all duration-500 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${member.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                <h3 className="text-xl font-serif font-medium mb-1">
                  {member.name}
                </h3>
                <p className="text-amber-400 text-sm tracking-widest uppercase font-medium">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
