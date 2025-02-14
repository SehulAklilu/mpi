import { FaCircleCheck } from "react-icons/fa6";
import CustomButton2 from "./CustomButton2";

function Purchases() {
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-center gap-y-4 flex-col">
        <h1 className="text-primary text-xl">OUR PRICING</h1>
        <h1 className="text-2xl md:text-4xl font-bold ">
          FLEXIBLE PRICING PLANS
        </h1>
        <p className="text-[#3B4547] w-[90%] lg:w-[50%] text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 gap-10 mx-4 md:mx-10 lg:mx-12 xl:mx-24 place-items-center ">
        {/* Basic Plan */}
        <div className=" bg-white shadow-lg rounded-lg p-6 h-fit">
          <h1 className="text-2xl font-semibold  mb-2">Tennis Academy</h1>
          <p className="text-sm my-2">
            For all individuals and starters who want to start with learning.
          </p>
          <hr className="my-2 border-[#000B33]" />
          <p className="text-6xl font-semibold text-primary mt-4">$19</p>
          <p className="">/ per Month</p>
          <hr className="my-2 border-[#000B33]" />

          <ul className="mt-4 space-y-2 ">
            <li className="flex gap-x-4">
              <FaCircleCheck /> Access to All Courses
            </li>
            <li className="flex gap-x-4">
              <FaCircleCheck /> Connect with Others
            </li>
            <li className="text-gray-800 flex gap-x-4">
              <FaCircleCheck /> Course Analytics{" "}
              <span className="text-xs">(Coming Soon)</span>
            </li>
            <li className="text-gray-800 flex gap-x-4">
              <FaCircleCheck /> Course Cohorts{" "}
              <span className="text-xs">(Coming Soon)</span>
            </li>
            <li className="text-gray-800 flex gap-x-4">
              <FaCircleCheck /> New Feature 3{" "}
              <span className="text-xs">(Coming Soon)</span>
            </li>
          </ul>

          <CustomButton2
            label="Register Now"
            url="signup"
            style="w-full py-2 mt-6"
          />
        </div>

        {/* Professional Plan */}
        <div className=" bg-black shadow-lg rounded-lg p-6 text-white relative">
          <h1 className="text-2xl font-semibold  mb-2">Tennis Court Rent</h1>

          <p className="text-sm">
            For professional domain names investors with a big portfolio.
          </p>
          <hr className="my-2 border-gray-200" />

          <p className="text-6xl font-semibold text-primary mt-4">$49</p>
          <p className="text-sm">/ per Month</p>

          <hr className="my-2 border-gray-200" />

          <ul className="mt-4 space-y-2">
            <li className="flex gap-x-4">
              <FaCircleCheck /> Access to All Courses
            </li>
            <li className="flex gap-x-4">
              <FaCircleCheck /> Connect with Others
            </li>
            <li className="flex gap-x-4">
              <FaCircleCheck /> Feature 3
            </li>
            <li className="flex gap-x-4">
              <FaCircleCheck /> Feature 4
            </li>
            <li className="text-gray-200 flex gap-x-4">
              <FaCircleCheck /> Course Analytics{" "}
              <span className="text-xs">(Coming Soon)</span>
            </li>
            <li className="text-gray-200 flex gap-x-4">
              <FaCircleCheck /> Course Cohorts{" "}
              <span className="text-xs">(Coming Soon)</span>
            </li>
            <li className="text-gray-200 flex gap-x-4">
              <FaCircleCheck /> New Feature 3{" "}
              <span className="text-xs">(Coming Soon)</span>
            </li>
          </ul>
          <CustomButton2
            label="Register Now"
            url="signup"
            style="w-full py-2 mt-6"
          />
        </div>

        {/* Advanced Plan */}
        <div className=" bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-semibold mb-2">Private Lessons</h1>

          <p className="text-sm">
            For all individuals and starters who want to start with domaining.
          </p>
          <hr className="my-2 border-[#000B33]" />

          <p className="text-6xl font-semibold text-primary mt-4">$99</p>

          <p className="text-gray-500">/ per Month</p>
          <hr className="my-2 border-[#000B33]" />

          <ul className="mt-4 space-y-2 ">
            <li className="flex gap-x-4">
              <FaCircleCheck /> Access to All Courses
            </li>
            <li className="flex gap-x-4">
              <FaCircleCheck /> Connect with Others
            </li>
            <li className="flex gap-x-4">
              <FaCircleCheck /> Feature 3
            </li>
            <li className="flex gap-x-4">
              <FaCircleCheck /> Feature 4
            </li>
            <li className="flex gap-x-4">
              <FaCircleCheck /> Feature 5
            </li>
            <li className="flex gap-x-4">
              <FaCircleCheck /> Feature 6
            </li>
            <li className="text-gray-800 flex gap-x-4">
              <FaCircleCheck /> Course Analytics{" "}
              <span className="text-xs">(Coming Soon)</span>
            </li>
          </ul>
          <CustomButton2
            label="Register Now"
            url="signup"
            style="w-full py-2 mt-6"
          />
        </div>
      </div>
    </div>
  );
}

export default Purchases;
