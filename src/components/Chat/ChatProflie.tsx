import { useState } from "react";
import user from "../../assets/user.jpeg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import img from "@/assets/progress/Frame 1171276020.svg";
import img3 from "@/assets/progress/target-arrow-svgrepo-com 1.svg";
import img6 from "@/assets/svg/avater-left.svg";
import img7 from "@/assets/svg/avater-right.svg";
import img8 from "@/assets/svg/muscle.svg";
import { IoMdPerson } from "react-icons/io";
import { IoAtOutline } from "react-icons/io5";
import { FaFlag } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa";
import { FaStreetView } from "react-icons/fa";
import { MdLocalPostOffice } from "react-icons/md";
import { BiSolidCake } from "react-icons/bi";
import UserCourses from "./UserCourses";
import { Heart, MessageCircle } from "lucide-react";
import { CiStar } from "react-icons/ci";
import { RiSettings4Fill } from "react-icons/ri";
import { ContentLayout } from "../Sidebar/contenet-layout";

interface ChatProflieInterface {
  img: string;
  label: string;
  sub: string;
  large?: boolean;
}

interface PersonalInfosInterface {
  icon: any;
  label: string;
  value: string;
}

function ChatProflie() {
  const [activeTab, setActiveTab] = useState("About");
  // const datas: ChatProflieInterface[] = [
  //   { img: img, label: "3 Courses", sub: "Completed" },
  //   { img: img3, label: "85%", sub: "Accuracy" },
  //   { img: img, label: "3 Courses", sub: "Completed" },
  //   { img: img8, label: "18", sub: "USTA", large: true },
  // ];

  const personalInfos: PersonalInfosInterface[] = [
    { icon: BiSolidCake, label: "Birthdate", value: "11-Sep-1998" },
    { icon: IoMdPerson, label: "Gender", value: "Male" },
    { icon: IoAtOutline, label: "Email", value: "mail@example.com" },
  ];

  const locations: PersonalInfosInterface[] = [
    {
      icon: FaFlag,
      label: "Country",
      value: "USA",
    },
    {
      icon: FaLocationDot,
      label: "State/Province",
      value: "Atlanta",
    },
    {
      icon: FaBuilding,
      label: "City",
      value: "Georgia",
    },
    {
      icon: FaStreetView,
      label: "Street Address",
      value: "123 Street",
    },
    {
      icon: MdLocalPostOffice,
      label: "Zip Code",
      value: "30033",
    },
  ];

  const mockReviews = [
    { id: 1, title: "Introduction", time: "2 hours ago", rating: 5 },
    { id: 2, title: "Fitness", time: "2 days ago", rating: 4.9 },
    { id: 3, title: "Rules of Tennis", time: "3 weeks ago", rating: 4.7 },
    { id: 4, title: "Playing Tennis", time: "23-02-25", rating: 5 },
    { id: 5, title: "History & Origins", time: "02-01-24", rating: 4.8 },
  ];

  const [reviews, setReviews] = useState(mockReviews);

  return (
    <ContentLayout>
      <div className="bg-white">
        <div className="flex items-center justify-between px-10 py-2">
          <div></div>
          <div>
            {/* <RiSettings4Fill size={40} className="text-primary" /> */}
          </div>
        </div>
        <div className="flex flex-col items-center gap-y-2 justify-center">
          <img className="w-20 h-20 rounded-full" src={user} />
          <h1 className="font-semibold text-xl text-[#152946]">
            Heinz Doofenshmirtz
          </h1>
          <p className="text-sm">Lorem impsum sit do amet lipsum</p>
          <div className="flex gap-4">
            <button className="bg-primary py-2 px-4 rounded-lg text-white">
              Follow
            </button>
            <button className="bg-white py-2 px-4 rounded-lg text-primary border border-primary">
              Message
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center mt-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            defaultValue="About"
            className="w-full"
          >
            <TabsList className="flex bg-[#FFF6ED] rounded-full w-full md:w-[30rem] lg:w-[40rem] shadow-md h-[2.5rem] md:h-[3rem] mx-auto border">
              <TabsTrigger
                value="About"
                className="flex-1 text-center py-1 text-sm md:text-base lg:text-lg rounded-full transition-colors data-[state=active]:bg-[#F2851C] data-[state=active]:text-white data-[state=inactive]:text-gray-700"
              >
                About
              </TabsTrigger>
              <TabsTrigger
                value="Courses"
                className="flex-1 text-center py-1 text-sm md:text-base lg:text-lg rounded-full transition-colors data-[state=active]:bg-[#F2851C] data-[state=active]:text-white data-[state=inactive]:text-gray-700"
              >
                Courses
              </TabsTrigger>
              <TabsTrigger
                value="Reviews"
                className="flex-1 text-center py-1 text-sm md:text-base lg:text-lg rounded-full transition-colors data-[state=active]:bg-[#F2851C] data-[state=active]:text-white data-[state=inactive]:text-gray-700"
              >
                Reviews
              </TabsTrigger>
            </TabsList>
            <TabsContent className="!mt-0" value="About">
              <div className="px-4 py-2">
                <div className="flex max-md:flex-col w-full">
                  <div className="w-full max-md:w-full bg-gradient-to-b from-[#F8B36D] to-[#F28822]  text-white rounded-xl py-4">
                    <div className="flex justify-center flex-wrap gap-x-10 gap-y-4 md:gap-x-16">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <img className="w-24" src={img} alt="" />
                        <div className="mt-1 text-lg font-semibold">
                          3 Courses
                        </div>
                        <div className="text-sm">Completed</div>
                      </div>

                      <div className="border border-white"></div>

                      <div className="flex flex-col items-center justify-center gap-1">
                        <img className="w-24" src={img3} alt="" />
                        <div className="mt-1 text-lg font-semibold">85%</div>
                        <div className="text-sm">Accuracy</div>
                      </div>

                      <div className="border border-white"></div>

                      <div className="flex flex-col items-center justify-center gap-1">
                        <img className="w-24" src={img} alt="" />
                        <div className="mt-1 text-lg font-semibold">
                          3 Courses
                        </div>
                        <div className="text-sm">Completed</div>
                      </div>

                      <div className="border border-white"></div>

                      <div className="flex flex-col items-center justify-center gap-1">
                        <img className="w-24" src={img8} alt="" />
                        <div className="text mt-1 text-3xl max-md:text-lg font-bold">
                          18
                        </div>
                        <div className="text-sm">USTA</div>
                      </div>
                    </div>
                    <div className=" px-4 flex items-center justify-center  mt-5">
                      <div className="flex justify-center py-4 px-10 bg-white text-primary gap-10 rounded-xl">
                        <div className="flex flex-col items-center justify-center gap-1">
                          <img className="w-24" src={img7} alt="" />
                          <div className="text mt-1 text-3xl max-md:text-lg font-bold">
                            1.5K
                          </div>
                          <div className="text-sm">Followers</div>
                        </div>

                        <div className="border border-primary"></div>

                        <div className="flex flex-col items-center justify-center gap-1">
                          <img className="w-24" src={img6} alt="" />
                          <div className="text mt-1 text-3xl max-md:text-lg font-bold">
                            53
                          </div>
                          <div className="text-sm">Following</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <h1 className="text-2xl my-2 font-semibold">
                      Personal Information
                    </h1>
                    <div className="flex items-center gap-6 flex-wrap">
                      {personalInfos.map((persoanlInfo) => (
                        <div className="flex gap-2 items-center">
                          <div className="w-[48px] h-[48px] flex bg-orange-50 rounded items-center justify-center">
                            <persoanlInfo.icon className="text-primary text-[40px]" />
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <p className="text-sm text-gray-400">
                              {persoanlInfo.label}
                            </p>
                            <p className="text-base font-medium">
                              {persoanlInfo.value}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h1 className="text-2xl my-2 font-semibold">Location</h1>
                    <div className="flex items-center gap-6 flex-wrap">
                      {locations.map((persoanlInfo) => (
                        <div className="flex gap-2 items-center">
                          <div className="w-[48px] h-[48px] flex bg-orange-50 rounded items-center justify-center">
                            <persoanlInfo.icon className="text-primary text-[40px]" />
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <p className="text-sm text-gray-400">
                              {persoanlInfo.label}
                            </p>
                            <p className="text-base font-medium">
                              {persoanlInfo.value}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent className="!mt-0" value="Courses">
              <UserCourses />
            </TabsContent>
            <TabsContent className="!mt-0" value="Reviews">
              <div className="flex flex-col items-center p-6 ">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                  {reviews.map((review, index) => (
                    <div
                      key={review.id}
                      className="bg-white p-4 rounded-2xl shadow-md flex flex-col gap-2 items-start"
                    >
                      <div className="flex items-center w-full gap-2 font-semibold text-gray-700">
                        <div className="flex items-center">
                          <img
                            src={`https://i.pravatar.cc/100?img=${index + 1}`}
                            alt="avatar"
                            className="w-14 h-14 rounded-full"
                          />
                          <span className="text-sm ml-2">{review.title}</span>
                        </div>
                        <div className="flex items-center ml-auto">
                          <span className="px-2 text-sm text-gray-500">
                            . {review.time}
                          </span>
                          <span className="text-gray-600 font-semibold flex items-center">
                            <CiStar className="text-lg" /> {review.rating}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Great Course, learned a lot about tennis
                      </p>
                      <div className="flex items-center gap-2 w-full text-gray-500 text-sm">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4 text-red-500 cursor-pointer" />
                          <span>Like</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4 cursor-pointer" />
                          <span>Reply</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-6 px-6 py-2 border-gray-400 rounded-xl shadow-md ">
                  Load More
                </button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ContentLayout>
  );
}

export default ChatProflie;
