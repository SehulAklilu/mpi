import React from "react";
import bgImage from "../../assets/landingpage/jeremy-yap-PQWDsr78l8w-unsplash-1024x683.jpg";
import image from "../../assets/landingpage/image21.png";
import image1 from "../../assets/landingpage/image21.png";
import image2 from "../../assets/landingpage/image22.png";
import image3 from "../../assets/landingpage/image26.webp";
import image4 from "../../assets/landingpage/image24.png";
import LandingPageNavBar from "./LandingPageNavBar";
import { FaArrowDown } from "react-icons/fa";
import { FaAnglesLeft } from "react-icons/fa6";
import { FaAnglesRight } from "react-icons/fa6";
import {
  FaFacebookF,
  FaInstagram,
  FaEnvelope,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
import Footer from "./Footer";
const BlogCard = ({ image, title, date, category, excerpt }: any) => {
  return (
    <div className="rounded-2xl shadow-xl drop-shadow-xl bg-white overflow-hidden p-4 ">
      <img
        src={image}
        alt={title}
        className="w-full rounded-2xl h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-3xl font-medium text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-4">
          {date} • {category}
        </p>
        <p className="text-gray-600 mb-6">{excerpt}</p>
        <button className="text-white bg-orange-500 px-4 py-2 rounded-full hover:bg-orange-600 transition">
          Read More
        </button>
      </div>
    </div>
  );
};

function Blog() {
  const posts = [
    {
      image: image,
      title: "Competition: Semi-Finals this Week!",
      date: "March 25, 2025",
      category: "News",
      excerpt:
        "Stay updated with the semi-final matches taking place this week!",
    },
    {
      image: image1,
      title: "New Field Materials Introduced",
      date: "March 25, 2025",
      category: "Update",
      excerpt:
        "We're excited to announce new materials for better field performance.",
    },
    {
      image: image2,
      title: "Welcoming a Brand New Coach Tonight",
      date: "March 25, 2025",
      category: "Announcement",
      excerpt:
        "Join us in welcoming our new coach who brings a wealth of experience!",
    },
    {
      image: image3,
      title: "New Game Ethics Tracking Featuring",
      date: "March 25, 2025",
      category: "Feature",
      excerpt:
        "Learn about the latest in game ethics and how it's being tracked.",
    },
    {
      image: image4,
      title: "Mindsight Extended Work Hours Again!",
      date: "March 25, 2025",
      category: "Update",
      excerpt:
        "Mindsight facilities are now open for extended hours for your convenience.",
    },
    {
      image: image,
      title: "Mindsight Open for Kids Under 11",
      date: "March 25, 2025",
      category: "Event",
      excerpt:
        "Exciting opportunities for kids under 11 with Mindsight programs!",
    },
  ];
  return (
    <div>
      <div
        className="relative h-[30rem] bg-cover bg-center bg-no-repeat overflow-x-hidden"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <LandingPageNavBar />

        {/* Diagonal black line */}
        <div className="absolute hidden md:block w-0 h-0 border-l-[100vw]  border-b-[30rem] top-0 border-l-transparent  border-b-black opacity-30"></div>

        {/* Content Section */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[90%] sm:max-w-[80%] md:max-w-[60%] text-center">
          <h1 className="text-3xl md:text-7xl text-white font-semibold tracking-wide leading-tight">
            Stay On Top Of Important Info
          </h1>

          <div className="mt-6 flex  flex-col md:flex-row items-center justify-center gap-4">
            <button className="w-12 h-12 text-lg rounded-full text-white bg-primary   flex items-center justify-center">
              <FaArrowDown className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto my-10">
        <h1 className="text-4xl font-bold text-center">News & Articles</h1>
        <div className="min-h-screen p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <BlogCard key={index} {...post} />
            ))}
          </div>
          <div className="flex justify-center items-center mt-8 space-x-4">
            <FaAnglesLeft className="text-primary cursor-pointer" />
            <button className="border-0 px-4 py-2 text-gray-500 bg-transparent rounded-lg hover:bg-gray-100">
              Previous
            </button>
            <button className="border-0 px-4 py-2 text-orange-500 font-bold bg-transparent rounded-lg hover:bg-gray-100">
              1
            </button>
            <button className="border-0 px-4 py-2 text-gray-500 bg-transparent rounded-lg hover:bg-gray-100">
              2
            </button>
            <button className="border-0 px-4 py-2 text-gray-500 bg-transparent rounded-lg hover:bg-gray-100">
              3
            </button>
            <button className="border-0 px-4 py-2 text-gray-500 bg-transparent rounded-lg hover:bg-gray-100">
              Next
            </button>
            <FaAnglesRight className="text-primary cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="container mx-auto my-20 space-y-4 p-2">
        <h1 className="text-3xl font-bold text-center">
          Stay Connect On Our Social Media
        </h1>
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="w-10 h-10 rounded-full border border-primary flex items-center justify-center">
            <FaFacebookF className="text-primary" />
          </div>
          <div className="w-10 h-10 rounded-full border border-primary flex items-center justify-center">
            <FaInstagram className="text-primary" />
          </div>
          <div className="w-10 h-10 rounded-full border border-primary flex items-center justify-center">
            <FaEnvelope className="text-primary" />
          </div>
          <div className="w-10 h-10 rounded-full border border-primary flex items-center justify-center">
            <FaYoutube className="text-primary" />
          </div>
          <div className="w-10 h-10 rounded-full border border-primary flex items-center justify-center">
            <FaLinkedin className="text-primary" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          <div>
            <h2 className="text-2xl md:text-5xl text-gray-800 md:w-[90%]">
              Subscribe To Our Weekly Newsletter
            </h2>
            <p className="text-gray-600 mt-4 leading-relaxed md:w-[90%]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
              dui at ligula commodo euismod. Quisque sapien libero, aliquet sit
              amet orci sed, sollicitudin blandit ipsum.
            </p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center md:justify-start md:w-[90%] rounded-full bg-transparent sm:bg-[#E9E9E9] ">
            <input
              type="email"
              placeholder="Email"
              className="w-full sm:w-auto flex-grow px-4 py-3 rounded-full bg-transparent text-black outline-none m-2 border sm:border-none"
            />
            <button className="w-full sm:w-auto px-6 py-3 m-2 bg-orange-500 text-white rounded-full shadow-md hover:bg-orange-600">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Blog;
