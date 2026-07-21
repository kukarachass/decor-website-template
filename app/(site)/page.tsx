import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { Categories } from "@/components/home/Categories";
import { Bestsellers } from "@/components/home/Bestsellers";
import { PromoBanner } from "@/components/home/PromoBanner";
import { About } from "@/components/home/About";
import { NewArrivals } from "@/components/home/NewArrivals";
import { Delivery } from "@/components/home/Delivery";
import { Testimonials } from "@/components/home/Testimonials";
import { InstagramStrip } from "@/components/home/InstagramStrip";
import { Newsletter } from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      {/*<Marquee />*/}
      <Categories />
      <Bestsellers />
      <PromoBanner />
      <About />
      <NewArrivals />
      <Delivery />
      <Testimonials />
      <InstagramStrip />
      <Newsletter />
    </>
  );
}
