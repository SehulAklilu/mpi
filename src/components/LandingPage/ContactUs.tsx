import React from "react";
import image10 from "../../assets/landingpage/image10.png";
import image11 from "../../assets/landingpage/image11.png";
import image12 from "../../assets/landingpage/image12.png";
import image13 from "../../assets/landingpage/image13.png";
import image14 from "../../assets/landingpage/image14.png";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoLogoYoutube,
} from "react-icons/io5";

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
    <div className="container mx-auto my-20">
      <h2 className="text-4xl font-bold text-center mb-6">Connect With Us</h2>
      <div className=" flex gap-4 justify-around">
        {contactInfos.map((contactInfo) => (
          <div className="relative group w-64 h-64 rounded-xl">
            <img
              className="w-full h-full object-cover rounded-xl"
              src={contactInfo.bgImage}
              alt="img"
            />
            {contactInfo?.socialMedia && (
              <div className=" w-[70%] h-[70%] absolute hidden group-hover:flex items-center flex-col gap-2 justify-center py-4 px-6 z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-opacity-40 bg-black  rounded-full text-white">
                <contactInfo.socialMedia.icon className="text-4xl  text-white" />
                <p className="text-xs text-white text-center font-semibold">
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
