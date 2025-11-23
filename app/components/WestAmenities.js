"use client";

export default function WestAmenities() {
  const amenities = [
    {
      title: "WiFi Compatible Smart Systems",
      icon: "/wifi.png",
    },
    {
      title: "Luxury Living",
      icon: "/sofa.png",
    },
    {
      title: "Branded Fittings",
      icon: "/shower.png",
    },
    {
      title: "Only The Best For You",
      icon: "/medal.png",
    },
  ];

  const sizeContent = (
    <div className="text-center mb-8">
      <div className="flex flex-col items-center gap-1">
        <span className="text-md md:text-md text-gray-500 tracking-wider">
          from
        </span>
        <div className="flex items-baseline gap-1">
          <span
            className="text-8xl md:text-[8rem] text-gray-900"
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
            className="text-8xl md:text-[8rem] text-gray-900"
            style={{ fontFamily: "VOLACROME, sans-serif" }}
          >
            4070
          </span>
          <span className="text-xs md:text-md text-gray-500">SFT</span>
        </div>
      </div>
    </div>
  );

  const iconsGrid = (
    <div className="grid grid-cols-2 gap-8 md:gap-12 mt-0 md:mt-16">
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
  );

  return (
    <>
      {/* Desktop version - Combined size + icons */}
      <div className="hidden md:flex w-full md:w-1/2 md:ml-auto bg-white py-12 px-4 md:px-12 flex-col justify-center">
        <div className="max-w-xl mx-auto">
          {sizeContent}
          {iconsGrid}
        </div>
      </div>

      {/* Mobile version - Size info (order 1) */}
      <div className="md:hidden w-full bg-white py-4 md:py-12 px-4 flex flex-col justify-center order-1">
        <div className="max-w-xl mx-auto">{sizeContent}</div>
      </div>

      {/* Mobile version - Icons (order 3, after WestFloorPlanViewer) */}
      <div className="md:hidden w-full bg-white pt-4 pb-10 px-4 flex flex-col justify-center order-3">
        <div className="max-w-xl mx-auto">{iconsGrid}</div>
      </div>
    </>
  );
}
