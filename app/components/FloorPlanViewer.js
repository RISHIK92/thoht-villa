"use client";

import { useState } from "react";
import ImageZoomModal from "./ImageZoomModal";

export default function FloorPlanViewer() {
  const tabs = ["Ground", "First", "Second"];

  const floorPlanImages = {
    Ground: "/East_ground.jpg",
    First: "/East_first.jpg",
    Second: "/East_second.jpg",
  };

  const [activeTab, setActiveTab] = useState("Ground");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      id="east-layout"
      className="w-full md:w-1/2 md:ml-auto bg-white py-4 md:py-12 px-4 md:px-12 flex flex-col items-center order-2 md:order-2"
    >
      {/* Tabs */}
      <div className="flex flex-nowrap md:flex-wrap justify-center gap-2 md:gap-8 mb-4 w-full md:w-2/3 max-w-2xl bg-white rounded-xl shadow-sm border border-gray-100 p-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-xl text-sm md:text-base font-medium transition-all duration-300 ${
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

        <div
          className="relative w-full h-full transition-all duration-500 ease-in-out transform cursor-pointer group"
          onClick={() => setIsModalOpen(true)}
        >
          <div
            className="w-full h-full bg-contain bg-center bg-no-repeat transition-opacity duration-500"
            style={{
              backgroundImage: `url(${floorPlanImages[activeTab]})`,
            }}
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8 text-gray-900"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* <div className="absolute top-0 left-0 w-full h-3/4 pointer-events-none">
          <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-amber-500/30" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-amber-500/30" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-amber-500/30" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-amber-500/30" />
        </div> */}
      </div>

      <ImageZoomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageSrc={floorPlanImages[activeTab]}
        imageAlt={`${activeTab} Floor Plan`}
      />
    </div>
  );
}
