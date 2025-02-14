import image1 from "../../assets/landingpage/image16.png";
import image2 from "../../assets/landingpage/image17.png";
import image3 from "../../assets/landingpage/image19.webp";
import CustomButton2 from "./CustomButton2";

interface CardInterface {
  image: any;
  title: string;
  type: string;
  weeks: number;
  lesson: number;
  review: number;
}

const cards: CardInterface[] = [
  {
    image: image1,
    title: "Introduction",
    type: "BASICS",
    weeks: 6,
    lesson: 25,
    review: 4.5,
  },
  {
    image: image2,
    title: "Introduction",
    type: "BASICS",
    weeks: 8,
    lesson: 32,
    review: 4.8,
  },
  {
    image: image3,
    title: "Introduction",
    type: "BASICS",
    weeks: 4,
    lesson: 15,
    review: 4.3,
  },
  {
    image: image2,
    title: "Introduction",
    type: "BASICS",
    weeks: 10,
    lesson: 40,
    review: 4.7,
  },
  {
    image: image1,
    title: "Introduction",
    type: "BASICS",
    weeks: 7,
    lesson: 28,
    review: 4.6,
  },
];

const Card = ({ card }: { card: CardInterface }) => {
  return (
    <div className="max-w-sm p-6 border shadow-lg rounded-lg ">
      <img
        src={card.image}
        alt="image"
        className="h-[14rem] w-full object-cover"
      />
      <h1 className="text-2xl font-medium text-[#011627] pt-4 ">
        {card.title?.toUpperCase()}
      </h1>
      <h1 className="text-2xl font-medium text-[#0244A1]">
        {card.type?.toUpperCase()}
      </h1>
      <div className="flex px-2 justify-between py-4">
        <div>
          <p className="text-xl">{card.weeks} Week</p>
          <p className="text-xl">{card.lesson} Lesson</p>
        </div>
        <div>
          {Array.from({ length: card.review }).map((_, index) => (
            <span key={index} className="text-yellow-500 px-1 text-xl">
              ★
            </span>
          ))}
          <p className="text-xl">{card.review} Reviews</p>
        </div>
      </div>
      <hr />
      <div className="flex items-center justify-center mt-4">
        <CustomButton2 label="Register Now" url="signup" style="py-2" />
      </div>
    </div>
  );
};

function CoursesListNew() {
  return (
    <div className="container mx-auto">
      <div className="mx-4 md:mx-10 lg:mx-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Card card={card} />
        ))}
      </div>
    </div>
  );
}

export default CoursesListNew;
