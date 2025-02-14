import React, { useState } from "react";
import LandingPageNavBar from "./LandingPageNavBar";
import bgImage from "../../assets/landingpage/image23.jpg";
import { FaArrowDown } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";
import image24 from "../../assets/landingpage/image24.png";
import image25 from "../../assets/landingpage/image25.png";
import JoinUs from "./JoinUs";
import Footer from "./Footer";
interface DetailDataInterface {
  type: "video" | "assesment";
  title: string;
  length: string;
}

interface CourseDetailInterface {
  title: string;
  details: DetailDataInterface[];
}

function CoursesDetail() {
  // const [openDropDown, setOpenDropDown] = useState()
  const detailDatas: CourseDetailInterface[] = [
    {
      title: "Introduction",
      details: [
        {
          type: "video",
          title: "About Me",
          length: "18:02 min",
        },
        {
          type: "video",
          title: "Influences",
          length: "21:07 mins",
        },
        {
          type: "assesment",
          title: "Assessment 01",
          length: "05:00 mins",
        },
      ],
    },
    {
      title: "Tools for a Creator",
      details: [
        {
          type: "video",
          title: "Materials and Tools",
          length: "13:02 mins",
        },
        {
          type: "video",
          title: "Elements of Mastery",
          length: "09:08 mins",
        },
        {
          type: "video",
          title: "Rules and Regulations",
          length: "18:30 mins",
        },
        {
          type: "assesment",
          title: "Assessment 02",
          length: "05:00 mins",
        },
      ],
    },
  ];
  return (
    <div>
      {/* hero */}
      <div
        className="relative h-[20rem] bg-cover bg-center bg-no-repeat overflow-x-hidden"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <LandingPageNavBar />

        {/* Diagonal black line */}
        <div className="absolute hidden md:block w-0 h-0 border-l-[100vw]  border-b-[20rem] top-0 border-l-transparent  border-b-black opacity-30"></div>

        {/* Content Section */}
        <div className="absolute bottom-10">
          <h1 className="text-3xl md:text-6xl text-white font-semibold tracking-wide leading-tight">
            Introduction To Tennis
          </h1>

          <div className="flex gap-4 text-white text-xl ml-4">
            <BiHomeAlt className="text-2xl text-primary cursor-pointer" />
            <p className="hover:underline">Courses</p>
            <AiOutlineDoubleRight className="text-2xl text-primary " />
            <p className="underline cursor-pointer">Introduction To Tennis</p>
          </div>
        </div>
      </div>

      {/* detail */}
      <div className="mx-4 md:mx-10 lg:mx-14 mt-10 grid grid-cols-1  md:grid-cols-6 gap-10 p-2">
        <div className="col-span-full  md:col-span-4 space-y-3">
          <h1 className="text-4xl text-[#152946] font-medium">
            Introduction to Tennis
          </h1>
          <h2 className="text-[#152946] font-semibold text-lg">Overview</h2>
          <p className="text-[#333333] text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
            dui at ligula commodo euismod. Quisque sapien libero, aliquet sit
            amet orci sed, sollicitudin blandit ipsum. Curabitur magna lectus,
            luctus sit amet urna quis, suscipit molestie massa. Aenean pharetra
            posuere tellus nec congue. Vivamus facilisis quam lorem, at volutpat
            ex efficitur lobortis. Sed interdum ullamcorper sollicitudin.
            Vivamus sempe
          </p>
          <div>
            <h1 className="text-[#152946] font-semibold text-lg">
              Course Contents
            </h1>
            <div>
              {detailDatas.map((detailData, index) => (
                <div className="bg-[#F8F9FA] rounded-lg p-1 my-2">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <div className="h-6 w-6 rounded-full bg-primary text-white text-sm flex items-center justify-center">
                        {index + 1}
                      </div>
                      <h1 className="text-[#152946] font-semibold text-lg">
                        {detailData.title}
                      </h1>
                    </div>
                    <FaCaretUp className="text-lg text-primary cursor-pointer" />
                  </div>
                  {detailData.details.map((detail, i) => (
                    <div className="flex gap-4 my-4 bg-white p-2 mx-2 rounded-2xl">
                      <div className="h-12 w-12 bg-[#EFF0FE] rounded-full flex items-center justify-center text-2xl text-[#152946]">
                        {detail.type === "video" ? (
                          <p className="font-bold">0{i + 1}</p>
                        ) : (
                          <TbTargetArrow className="text-2xl text-[#152946]" />
                        )}
                      </div>
                      <div>
                        <h1 className="font-bold">{detail.title}</h1>
                        <p className="text-sm">{detail.length}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-full md:col-span-2 bg-white p-2 rounded-2xl space-y-4 shadow-xl drop-shadow-lg">
          <h1 className="text-2xl text-[#152946] font-bold">Course Preview</h1>
          <img src={image24} className="h-[16rem] rounded-xl" />
          <h1 className="text-xl text-[#152946] font-semibold">Instructors</h1>
          <div className="w-fit flex flex-col items-center justify-center">
            <img className="h-[6rem]" src={image25} alt="profile" />
            <h1 className="text-xl font-semibold text-[#152946]">
              Damian Johns
            </h1>
            <h1 className="text-lg text-[#152946]">Tennis Coach</h1>
          </div>
          <h1 className="text-2xl text-[#152946] font-bold">About Course</h1>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                {Array.from({ length: 5 }).map((_, index) => (
                  <span key={index} className="text-yellow-500 text-lg">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-[#152946]">15 Reviews</p>
            </div>
            <p className="text-sm text-[#333333]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
              dui at ligula commodo euismod. Quisque sapien libero, aliquet sit
              amet orci sed, sollicitudin blandit ipsum. Curabitur magna lectus,
              luctus sit amet urna quis, suscipit molestie massa. Aenean
              pharetra posuere tellus nec congue. Vivamus facilisis quam lorem,
              at volutpat ex efficitur lobortis. Sed interdum ullamcorper
              sollicitudin. Vivamus sempe
            </p>
            <button className="w-full py-2 rounded-full bg-primary text-white">
              Register & Enroll
            </button>
          </div>
        </div>
      </div>

      {/* join us */}
      <JoinUs />
      <Footer />
    </div>
  );
}

export default CoursesDetail;
