import React from "react";
import TestimonialsHero from "./TestimonialsHero";
import Reviews from "./Reviews";
import FAQSection from "./FAQSection";
import TennisLocations from "./TennisLocations";
import ContactUs from "./ContactUs";
import Footer from "./Footer";

function Testimonial() {
  return (
    <div>
      <TestimonialsHero />
      <Reviews />
      <FAQSection />
      <TennisLocations />
      <ContactUs />
      <Footer />
    </div>
  );
}

export default Testimonial;
