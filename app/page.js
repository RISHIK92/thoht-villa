import AnimatedLanding from "./components/AnimatedLanding";
import BannerCarousel from "./components/BannerCarousel";
import EastSection from "./components/EastSection";
import WestSection from "./components/WestSection";
import FloorPlanViewer from "./components/FloorPlanViewer";
import WestFloorPlanViewer from "./components/WestFloorPlanViewer";
import TeamSection from "./components/TeamSection";

export default function Home() {
  return (
    <div className="bg-white">
      <AnimatedLanding />
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />
      <BannerCarousel />
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />
      <EastSection />
      <FloorPlanViewer />
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />
      <WestSection />
      <WestFloorPlanViewer />
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />
      <TeamSection />
    </div>
  );
}
