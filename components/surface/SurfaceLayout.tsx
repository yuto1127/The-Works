import Hero from "./Hero";
import Skills from "./Skills";
import Projects from "./Projects";
import Footer from "./Footer";

export default function SurfaceLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Skills />
      <Projects />
      <Footer />
    </div>
  );
}

