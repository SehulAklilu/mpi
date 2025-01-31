import image6 from "../../assets/landingpage/image6.png";
import image7 from "../../assets/landingpage/image7.png";
import image15 from "../../assets/landingpage/image15.png";
import CustomButton from "./CustomButton";

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
  buttonLink,
}: CardIinterface) => {
  return (
    <div className="bg-white rounded-3xl flex justify-between flex-col items-start shadow p-4 space-y-6 border border-gray-200 max-w-md">
      <div>
        <img
          src={image}
          alt={title}
          className="w-full h-72  object-cover rounded-t-2xl"
        />
        <h3 className="text-xl font-bold mt-4">{title}</h3>
        <p className="text-gray-600 mt-2 max-w-md">{description}</p>
      </div>
      <CustomButton title={buttonText} />
    </div>
  );
};

const TrainingSection = () => {
  return (
    <div className="flex my-20 container mx-auto gap-6 overflow-x-auto">
      {cardData.map((card) => (
        <TrainingCard key={card.id} {...card} />
      ))}
    </div>
  );
};

export default TrainingSection;
