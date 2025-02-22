import React from "react";
import image10 from "../../assets/landingpage/image10.png";
import image11 from "../../assets/landingpage/image11.png";
import image12 from "../../assets/landingpage/image12.png";
import image13 from "../../assets/landingpage/image13.png";
import image14 from "../../assets/landingpage/image13.png";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoLogoYoutube,
} from "react-icons/io5";
import "./footer.css";
function ContactUs() {
  const contactInfos = [
    {
      id: 1,
      bgImage: image10,
      socialMedia: {
        icon: IoLogoInstagram,
        message: "Enhance your tennis journey: Follow us on Instagram",
      },
    },
    {
      id: 2,
      bgImage: image11,
      socialMedia: {
        icon: IoLogoFacebook,
        message: "Join the community: Like us on Facebook for updates",
      },
    },
    {
      id: 3,
      bgImage: image12,
      socialMedia: {
        icon: IoLogoTwitter,
        message: "Stay informed: Follow us on Twitter for the latest news",
      },
    },
    {
      id: 4,
      bgImage: image13,
      socialMedia: {
        icon: IoLogoLinkedin,
        message: "Connect with professionals: Follow us on LinkedIn",
      },
    },
    {
      id: 5,
      bgImage: image14,
      socialMedia: {
        icon: IoLogoYoutube,
        message: "Watch exclusive content: Subscribe to our YouTube channel",
      },
    },
  ];

  return (
    <div className="container mx-auto my-10">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6">
        Connect With Us
      </h2>

      {/* Scrollable Container */}
      <div className="flex space-x-6 overflow-x-auto scrollbar-hidden-custom px-2 ">
        {contactInfos.map((contactInfo, index) => (
          <div
            key={index}
            className="relative group flex-shrink-0 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-xl"
          >
            <img
              className="w-full h-full object-cover rounded-xl"
              src={contactInfo.bgImage}
              alt="img"
            />

            {contactInfo?.socialMedia && (
              <div className="absolute hidden group-hover:flex items-center flex-col gap-2 justify-center w-[80%] h-[80%] py-4 px-6 bg-black bg-opacity-40 rounded-full text-white z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <contactInfo.socialMedia.icon className="text-2xl sm:text-3xl md:text-4xl text-white" />
                <p className="text-xs sm:text-sm text-white text-center font-semibold">
                  {contactInfo.socialMedia.message}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactUs;
