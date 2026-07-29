import { Nav } from "@/components/Nav";
import { Approach } from "@/components/sections/Approach";
import { Career } from "@/components/sections/Career";
import { Cases } from "@/components/sections/Cases";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Retainer } from "@/components/sections/Retainer";
import { Services } from "@/components/sections/Services";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Approach />
        <Services />
        <Cases />
        <Career />
        <Retainer />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
