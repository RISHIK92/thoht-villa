"use client";

export default function EastAmenities() {
  const amenities = [
    {
      title: "WiFi Compatible Smart Systems",
      icon: "/wifi.png",
    },
    {
      title: "Only The Best For You",
      icon: "/medal.png",
    },
    {
      title: "Luxury Living",
      icon: "/sofa.png",
    },
    {
      title: "Branded Fittings",
      icon: "/shower.png",
    },
  ];

  return (
    <div className="w-1/2 bg-white py-12 px-4 md:px-12 flex flex-col justify-center">
      <div className="max-w-xl mx-auto">
        {/* Size Range */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2">
            <span className="text-md md:text-md text-gray-500 tracking-wider">
              from
            </span>
            <div className="flex items-baseline gap-1">
              <span
                className="text-5xl md:text-[8rem] text-gray-900"
                style={{ fontFamily: "VOLACROME, sans-serif" }}
              >
                3525
              </span>
              <span className="text-xs md:text-md text-gray-500">SFT</span>
            </div>
            <span className="text-md md:text-md text-gray-500 tracking-wider mt-2">
              to
            </span>
            <div className="flex items-baseline gap-1">
              <span
                className="text-5xl md:text-[8rem] text-gray-900"
                style={{ fontFamily: "VOLACROME, sans-serif" }}
              >
                4055
              </span>
              <span className="text-xs md:text-md text-gray-500">SFT</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 md:gap-12 mt-16">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                <img
                  src={amenity.icon}
                  alt={amenity.title}
                  className="w-12 h-12 md:w-14 md:h-14 object-contain"
                />
              </div>
              <h3 className="text-sm md:text-base font-bold text-gray-900 leading-tight px-2">
                {amenity.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
