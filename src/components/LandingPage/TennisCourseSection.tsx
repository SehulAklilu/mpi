import image from "../../assets/landingpage/image18.png";
import blob1 from "../../assets/landingpage/blob-haikei (12).svg";
import blob2 from "../../assets/landingpage/blob-haikei (13).svg";
import blob3 from "../../assets/landingpage/blob-haikei (14).svg";
import blob4 from "../../assets/landingpage/blob-haikei (15).svg";
import blob5 from "../../assets/landingpage/blob-haikei (16).svg";
import blob6 from "../../assets/landingpage/blob-haikei (17).svg";
import blob10 from "../../assets/landingpage/blob-haikei (21).svg";

const TennisCourseSection = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-5 container mx-auto my-20 gap-8 px-4">
      {/* Text Section */}
      <div className="flex flex-col col-span-2 gap-2 space-y-1">
        <h4 className="font-semibold text-sm sm:text-base md:text-lg uppercase">
          MAKING ALL THE RIGHT MOVES
        </h4>
        <h2 className="text-black text-3xl sm:text-5xl md:text-6xl font-semibold">
          Do something really great with us.
        </h2>
        <div className="">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id dui
          at ligula commodo euismod. Quisque sapien libero, aliquet sit amet
          orci sed, sollicitudin blandit ipsum. Curabitur magna lectus, luctus
          sit amet urna quis, suscipit molestie massa. Aenean pharetra posuere
          tellus nec congue. Vivamus facilisis quam lorem, at volutpat ex
          efficitur lobortis. Sed interdum ullamcorper sollicitudin. Vivamus
          semper augue turpis, at vulputate turpis sodales eu. Sed semper
          tristique mauris vel sagittis.
        </div>
      </div>

      {/* Image Section */}
      <div className="relative col-span-3 flex items-center justify-center">
        <img
          src={blob10}
          alt="Tennis Trainer"
          className="w-[24rem] sm:w-[29rem] md:w-[32rem] lg:w-[40rem] h-[18rem] sm:h-[22rem] md:h-[24rem] lg:h-[30rem] object-cover rounded-2xl absolute"
        />
        <img
          src={blob2}
          alt="Tennis Trainer"
          className="w-[24rem] sm:w-[29rem] md:w-[32rem] lg:w-[40rem] h-[18rem] sm:h-[22rem] md:h-[24rem] lg:h-[30rem] object-cover rounded-2xl absolute"
        />
        <img
          src={blob3}
          alt="Tennis Trainer"
          className="w-[24rem] sm:w-[29rem] md:w-[32rem] lg:w-[40rem] h-[18rem] sm:h-[22rem] md:h-[24rem] lg:h-[30rem] object-cover rounded-2xl absolute"
        />
        <img
          src={blob4}
          alt="Tennis Trainer"
          className="w-[24rem] sm:w-[29rem] md:w-[32rem] lg:w-[40rem] h-[18rem] sm:h-[22rem] md:h-[24rem] lg:h-[30rem] object-cover rounded-2xl absolute"
        />
        <img
          src={blob5}
          alt="Tennis Trainer"
          className="w-[24rem] sm:w-[29rem] md:w-[32rem] lg:w-[40rem] h-[18rem] sm:h-[22rem] md:h-[24rem] lg:h-[30rem] object-cover rounded-2xl absolute"
        />
        <img
          src={blob6}
          alt="Tennis Trainer"
          className="w-[24rem] sm:w-[29rem] md:w-[32rem] lg:w-[40rem] h-[18rem] sm:h-[22rem] md:h-[24rem] lg:h-[30rem] object-cover rounded-2xl absolute"
        />
        <img
          src={blob1}
          alt="Tennis Trainer"
          className="w-[24rem] sm:w-[29rem] md:w-[32rem] lg:w-[40rem] h-[18rem] sm:h-[22rem] md:h-[24rem] lg:h-[30rem] object-cover rounded-2xl absolute"
        />
        <img
          src={image}
          alt="Tennis Trainer"
          className="w-[20rem] sm:w-[22rem] md:w-[26rem] lg:w-[29rem] h-[14rem] sm:h-[18rem] md:h-[20rem] lg:h-[21rem] z-10 object-cover rounded-2xl"
        />
      </div>
    </section>
  );
};

export default TennisCourseSection;
