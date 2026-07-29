import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Work from "@/components/Work";
import Teaching from "@/components/Teaching";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PageShell from "@/components/PageShell";

export default function Home() {
  return (
    <PageShell>
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Work />
      <Teaching />
      <Contact />
      <Footer />
    </PageShell>
  );
}
