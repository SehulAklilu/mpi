import {
  FaFacebookF,
  FaInstagram,
  FaEnvelope,
  FaYoutube,
} from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="bg-black mt-20 text-white py-10 sm:min-h-[60vh] px-6 md:px-16 relative diagonal-box">
      {/* <div className="absolute rounded-t-[3rem] top-0 left-0 w-full h-20 bg-black"></div> */}
      <div className="absolute rounded-t-[3rem] -top-6 -z-10  left-0 w-full h-40 bg-orange-500 transform  -skew-y-1"></div>
      <div className="max-w-7xl  pt-10 md:pt-20  z-20 mx-auto grid grid-cols-1 md:grid-cols-10 gap-8">
        {/* Company Info */}
        <div className="col-span-4">
          <h2 className="text-4xl font-bold">MPI</h2>
          <p className="mt-4 text-gray-300 text-sm">
            Welcome to MPI, your premier Tennis Training Center. We offer a
            range of courses designed to elevate your game, alongside access to
            top-notch training facilities and essential tools for coaches.
          </p>
          <div className="mt-4 space-y-2 text-gray-300 text-sm">
            <p className="hover:underline cursor-pointer">✆ +1 23 456 789</p>
            <p className="hover:underline cursor-pointer">
              ✉ support@mpi-tennis.com
            </p>
            <p className="hover:underline cursor-pointer">
              📍 123 Tennis Court, City, Country
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="col-span-2">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-gray-300 text-sm">
            <li className="hover:underline cursor-pointer">Home</li>
            <li className="hover:underline cursor-pointer">About Us</li>
            <li className="hover:underline cursor-pointer">Courses</li>
            <li className="hover:underline cursor-pointer">Training Center</li>
            <li className="hover:underline cursor-pointer">Coaches' Tools</li>
            <li className="hover:underline cursor-pointer">Player Progress</li>
          </ul>
        </div>

        {/* Additional Links */}
        <div className="col-span-2">
          <h3 className="text-lg font-semibold">Additional Links</h3>
          <ul className="mt-4 space-y-2 text-gray-300 text-sm">
            <li className="hover:underline cursor-pointer">Testimonials</li>
            <li className="hover:underline cursor-pointer">FAQs</li>
            <li className="hover:underline cursor-pointer">Contact Us</li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="col-span-4 lg:col-span-2">
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="mt-4 flex space-x-4">
            <FaFacebookF className="text-white bg-gray-800 p-2 rounded-full w-10 h-10 hover:bg-orange-500 cursor-pointer" />
            <FaInstagram className="text-white bg-gray-800 p-2 rounded-full w-10 h-10 hover:bg-orange-500 cursor-pointer" />
            <FaEnvelope className="text-white bg-gray-800 p-2 rounded-full w-10 h-10 hover:bg-orange-500 cursor-pointer" />
            <FaYoutube className="text-white bg-gray-800 p-2 rounded-full w-10 h-10 hover:bg-orange-500 cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-400 text-sm">
        © 2025 MPI. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
