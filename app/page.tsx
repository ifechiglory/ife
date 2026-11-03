import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Work from "@/components/sections/Work";
import Teaching from "@/components/sections/Teaching";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import GridBackground from "@/components/ui/GridBackground";

export default function Home() {
  return (
    <>
    <GridBackground/>
      <Nav />
      <Hero />
      <About />
      <Skills/>
      <Experience />
      <Work />
      <Teaching />
      <Contact />
      <Footer />
    </>
  );
}
