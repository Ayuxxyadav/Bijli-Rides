import React from 'react';
import Navbar from "./components/NavBar"
import HeroSection from './components/HeroSection';
import SpecsSection from './components/SpecsSection';
import FeaturesSection from "./components/FeatureSection"
import Footer from './components/Footer';
import "./index.css"
export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white selection:bg-emerald-500 selection:text-black">
      <Navbar />
      <HeroSection />
      <SpecsSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
}