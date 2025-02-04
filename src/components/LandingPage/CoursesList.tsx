import React from "react";
import imgage16 from "../../assets/landingpage/image16.png";
import imgage17 from "../../assets/landingpage/image17.png";
import imgage19 from "../../assets/landingpage/image19.webp";

interface Courses {
  id: number;
  title: string;
  description: string;
  image: string;
  courseNumber: string;
}
const courses: Courses[] = [
  {
    id: 1,
    title: "Learn the Tennis Fundamentals",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ullamcorper sit amet nibh ac faucibus. Phasellus congue nisi fermentum nunc laoreet facilisis. Aenean urna elit, condimentum nec metus quis, pellentesque interdum ipsum. Maecenas eu vestibulum nunc. Quisque",
    image: imgage17,
    courseNumber: "Course 01",
  },
  {
    id: 2,
    title: "Rules and Regulations",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ullamcorper sit amet nibh ac faucibus. Phasellus congue nisi fermentum nunc laoreet facilisis. Aenean urna elit, condimentum nec metus quis, pellentesque interdum ipsum. Maecenas eu vestibulum nunc. Quisque",
    image: imgage16,
    courseNumber: "Course 02",
  },
  {
    id: 3,
    title: "Learn the Tennis Fundamentals",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ullamcorper sit amet nibh ac faucibus. Phasellus congue nisi fermentum nunc laoreet facilisis. Aenean urna elit, condimentum nec metus quis, pellentesque interdum ipsum. Maecenas eu vestibulum nunc. Quisque",
    image: imgage19,
    courseNumber: "Course 03",
  },
];

const CourseCard = ({
  course,
  rotate,
}: {
  course: Courses;
  rotate: boolean;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-1 md:px-4 md:gap-10 bg-white rounded-lg">
      {!rotate ? (
        <>
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-[40vh] md:h-[70vh] rounded-lg object-cover order-first"
          />
          <div className="flex flex-col justify-center">
            <p className="text-sm text-orange-500 font-bold">
              {course.courseNumber}
            </p>
            <h2 className="text-xl md:text-3xl font-bold my-2  md:my-4 text-[#101828]">
              {course.title}
            </h2>
            <p className="text-gray-600 mt-2">{course.description}</p>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col justify-center">
            <p className="text-sm text-orange-500 font-bold">
              {course.courseNumber}
            </p>
            <h2 className="text-xl md:text-3xl font-bold my-2  md:my-4 text-[#101828]">
              {course.title}
            </h2>
            <p className="text-gray-600 mt-2">{course.description}</p>
          </div>
          <img
            src={course.image}
            alt={course.title}
            className={`w-full h-[40vh] md:h-[70vh] rounded-lg object-cover ${
              rotate ? "order-first md:order-last" : ""
            }`}
          />
        </>
      )}
    </div>
  );
};

const CoursesList = () => {
  return (
    <div className="container mx-auto p-6 grid gap-8">
      {courses.map((course, i) => (
        <CourseCard key={course.id} course={course} rotate={i % 2 === 0} />
      ))}
    </div>
  );
};

export default CoursesList;
