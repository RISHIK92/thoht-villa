"use client";

import { useState } from "react";

export default function WestFloorPlanViewer() {
  const tabs = ["Ground", "First", "Second"];

  const floorPlanImages = {
    Ground: "/West_ground.jpg",
    First: "/West_first.jpg",
    Second: "/West_second.jpg",
  };

  const [activeTab, setActiveTab] = useState("Ground");

  return (
    <div className="w-full md:w-1/2 bg-white py-4 md:py-12 px-4 md:px-12 flex flex-col items-center order-2 md:order-2">
      {/* Tabs */}
      <div className="flex flex-nowrap md:flex-wrap justify-center gap-2 md:gap-8 mb-4 w-full md:w-2/3 max-w-2xl bg-white rounded-xl shadow-sm border border-gray-100 p-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 rounded-xl text-sm md:text-base font-medium transition-all duration-300 ${
              activeTab === tab
                ? "bg-black text-white shadow-md"
                : "text-gray-500 hover:text-black hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="w-full max-w-xl relative aspect-[3/4] flex items-center justify-center">
        <div className="absolute inset-0 bg-white" />

        <div className="relative w-full h-full transition-all duration-500 ease-in-out transform">
          <div
            className="w-full h-full bg-contain bg-center bg-no-repeat transition-opacity duration-500"
            style={{
              backgroundImage: `url(${floorPlanImages[activeTab]})`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
