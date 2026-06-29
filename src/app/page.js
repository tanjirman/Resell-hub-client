import Banner from "@/components/homePage/Banner";
import MarketplaceStatistics from "@/components/homePage/MarketplaceStatistics";
import SuccessStories from "@/components/homePage/SuccessStories";
import Image from "next/image";

export default function Home() {
  return (
    <div >
      <Banner/>
      <SuccessStories/>
      <MarketplaceStatistics/>
      
    </div>
  );
}
