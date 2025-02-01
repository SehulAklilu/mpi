import image6 from "../../assets/landingpage/image6.png";
import image7 from "../../assets/landingpage/image7.png";
import image15 from "../../assets/landingpage/image15.png";
import CustomButton from "./CustomButton";
import "./footer.css";
interface CardIinterface {
  id: number;
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const cardData: CardIinterface[] = [
  {
    id: 1,
    image: image6, // Replace with actual path
    title: "Elevate Your Tennis Game with MPI",
    description:
      "Take your tennis journey to new heights with MPI’s specialized training programs tailored for players of all skills. Our dynamic environment will enhance your game strategy and technique through expert guidance.",
    buttonText: "Explore Our Training Programs",
    buttonLink: "#",
  },
  {
    id: 2,
    image: image7, // Replace with actual path
    title: "Innovative Coaching Tools for Success",
    description:
      "Access advanced resources that empower coaches to monitor player performance with precision. Our data-driven approach facilitates tailored feedback, honing each player’s skills effectively.",
    buttonText: "Discover Coaching Tools",
    buttonLink: "#",
  },
  {
    id: 2,
    image: image15, // Replace with actual path
    title: "Join Our Tennis Community",
    description:
      "Connect with passionate tennis players and coaches. Engage in expertly structured courses that emphasize growth, teamwork, and a love for the game, designed for anyone aiming to improve their skills on the court.",
    buttonText: "Get in Touch with Us",
    buttonLink: "#",
  },
];

const TrainingCard = ({
  image,
  title,
  description,
  buttonText,
}: CardIinterface) => {
  return (
    <div className="bg-white rounded-3xl flex flex-col items-start shadow p-4 space-y-6 border border-gray-200 w-full sm:w-[70%] md:max-w-md lg:max-w-[26rem] flex-shrink-0">
      <div>
        <img
          src={image}
          alt={title}
          className="w-full h-72  object-cover rounded-t-2xl"
        />
        <h3 className="text-xl font-bold mt-4">{title}</h3>
        <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-md">
          {description}
        </p>
      </div>
      <CustomButton title={buttonText} />
    </div>
  );
};

const TrainingSection = () => {
  return (
    <div className="flex justify-between container mx-auto gap-6 overflow-x-auto scrollbar-hidden-custom p-2 lg:p-0 my-4 sm:my-10 md:my-20">
      {cardData.map((card) => (
        <TrainingCard key={card.id} {...card} />
      ))}
    </div>
  );
};

export default TrainingSection;

//  <div className="container mx-auto my-8 sm:my-10 md:my-20 px-4 lg:px-0">
//       <div className="flex gap-6 overflow-x-auto scrollbar-hide sm:scroll-snap-x sm:flex-nowrap sm:overflow-x-scroll md:overflow-x-scroll xl:overflow-x-visible scrollbar-hidden">
//         {cardData.map((card) => (
//           <TrainingCard key={card.id} {...card} />
//         ))}
//       </div>
//     </div>
