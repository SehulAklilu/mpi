import logo from "../assets/mpi_logo.png";
import Button from "../components/Button/Button";

const TakeShortQuiz = () => {
  return (
    <div className="bg-backgroundColor h-screen py-12">
      <div className="flex flex-col gap-5 items-center justify-center">
        <div className="w-56  ">
          <img src={logo} alt="mpi logo" />
        </div>
        <div className="flex flex-col gap-10">
          <h3
            className={`font-normal phone:text-2xl text-3xl xs-phone:text-xl text-[#565D6A] text-center `}
          >
            Your Competitve Edge: Insight
          </h3>
        </div>
        <div className="flex flex-col gap-10 py-12 items-center justify-center">
          <div className="flex flex-col gap-10 xs-phone:gap-6 justify-center items-center">
            <div className="flex flex-col gap-2">
              <h3
                className={`font-bold text-4xl  xs-phone:text-2xl text-primary text-center `}
              >
                Welcome!
              </h3>
              <h3
                className={`font-normal xs-phone:text-xl text-black-75 text-center `}
              >
                We’ve set up a quick quiz <br /> to measure your level!
              </h3>
            </div>
            <Button
              type={"submit"}
              buttonText={"Take a short quiz"}
              backgroundStyleOn={true}
              onclick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeShortQuiz;
