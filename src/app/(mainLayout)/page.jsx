import Banner from "@/components/homePage/Banner";
import MarketplaceStatistics from "@/components/homePage/MarketplaceStatistics";
import SuccessStories from "@/components/homePage/SuccessStories";
import Sustainability from "@/components/homePage/Sustainability";
import TrustedSellers from "@/components/homePage/TrustedSeller";
import Image from "next/image";

export default function Home() {
  return (
    <div >
      <Banner/>
      <SuccessStories/>
      <MarketplaceStatistics/>
      <Sustainability/>
      <TrustedSellers/>
      
    </div>
  );
}
