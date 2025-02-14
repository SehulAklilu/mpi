import React from "react";
import AboutUsHero from "./AboutUsHero";
import AboutUsTestimonial from "./AboutUsTestimonial";
import AboutUsInfo from "./AboutUsInfo";
import AdvantageNewsletter from "./AdvantageNewsletter";
import Footer from "./Footer";

function AboutUsContainer() {
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

export default AboutUsContainer;
