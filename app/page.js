import AnimatedLanding from "./components/AnimatedLanding";
import BannerCarousel from "./components/BannerCarousel";
import EastSection from "./components/EastSection";
import WestSection from "./components/WestSection";
import FloorPlanViewer from "./components/FloorPlanViewer";
import WestFloorPlanViewer from "./components/WestFloorPlanViewer";
import WestAmenities from "./components/WestAmenities";
import EastAmenities from "./components/EastAmenities";
import TeamSection from "./components/TeamSection";
import ContactSection from "./components/ContactSection";
import MapSection from "./components/MapSection";
import RotatePrompt from "./components/RotatePrompt";

export default function Home() {
  return (
    <div className="bg-white">
      <RotatePrompt />
      <AnimatedLanding />
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />
      <BannerCarousel />
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />
      <EastSection />
      <div className="flex flex-col md:flex-row w-full">
        <EastAmenities />
        <FloorPlanViewer />
      </div>
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />
      <WestSection />
      <div className="flex flex-col md:flex-row w-full">
        <WestFloorPlanViewer />
        <WestAmenities />
      </div>
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />
      <TeamSection />
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />
      <ContactSection />
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />
      <MapSection />
    </div>
  );
}
