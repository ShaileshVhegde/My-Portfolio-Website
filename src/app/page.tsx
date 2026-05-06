"use client";

import Navbar from "@/components/layout/Navbar";
import GridBackground from "@/components/ui/GridBackground";
import ParticleBackground from "@/components/ui/ParticleBackground";
import BackToTop from "@/components/ui/BackToTop";
import DeploymentPipeline from "@/components/ui/DeploymentPipeline";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Certifications from "@/components/sections/Certifications";
import Finance from "@/components/sections/Finance";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative w-full bg-[#020508] min-h-screen">
      {/* Visual Infrastructure */}
      <GridBackground />
      <ParticleBackground />
      <DeploymentPipeline />
      
      {/* Fixed UI */}
      <Navbar />
      <BackToTop />
      
      {/* Content Layers */}
      <div className="relative z-10 flex flex-col w-full pl-0 lg:pl-16">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Finance />
        <Contact />
      </div>

      {/* Cinematic Vignette Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[5] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </main>
  );
}
