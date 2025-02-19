import React from "react";
import AboutUsHero from "../components/LandingPage/AboutUsHero";
import AboutUsTestimonial from "../components/LandingPage/AboutUsTestimonial";
import AboutUsInfo from "../components/LandingPage/AboutUsInfo";
import AdvantageNewsletter from "../components/LandingPage/AdvantageNewsletter";
import Footer from "../components/LandingPage/Footer";

function AboutUsPage() {
  return (
    <div className="bg-white">
      <AboutUsHero />
      <AboutUsInfo />
      <AboutUsTestimonial />
      <AdvantageNewsletter />
      <Footer />
    </div>
  );
}

export default AboutUsPage;
