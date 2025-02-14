import image from "../../assets/landingpage/image22.png";

function AboutUsInfo() {
  return (
    <div className="container px-2 md:px-0 my-10  md:my-20 mx-auto">
      {/* First Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <img src={image} className="object-cover md:block hidden" alt="image" />
        <div className="space-y-4 flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-4xl xl:text-6xl font-medium">
            We Are One Of The Greatest Trainers
          </h1>
          <p className="text-sm xl:text-base text-[#333333]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
            dui at ligula commodo euismod. Quisque sapien libero, aliquet sit
            amet orci sed, sollicitudin blandit ipsum. Curabitur magna lectus,
            luctus sit amet urna quis, suscipit molestie massa. Aenean pharetra
            posuere tellus nec congue. Vivamus facilisis quam lorem, at volutpat
            ex efficitur lobortis. Sed interdum ullamcorper sollicitudin.
          </p>
          <button className="px-6 py-3 rounded-full bg-primary text-white">
            Contact Us
          </button>
        </div>
      </div>

      {/* Second Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 my-10 md:my-20">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-medium">
            We Would Love To See Tennis Become Accessible To All
          </h1>
        </div>
        <div className="text-sm xl:text-base text-[#333333]">
          <p className="text-center md:text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
            dui at ligula commodo euismod. Quisque sapien libero, aliquet sit
            amet orci sed, sollicitudin blandit ipsum. Curabitur magna lectus,
            luctus sit amet urna quis, suscipit molestie massa. Aenean pharetr
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-4">
            <div className="text-center md:text-left">
              <h1 className="text-[#0244A1] text-lg mb-1">OUR VISION</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                id dui at ligula commodo euismod. Quisque sapien libero, aliquet
                sit amet orci sed, sollicitudin blandit ipsum.
              </p>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-[#0244A1] text-lg mb-1">OUR MISSION</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                id dui at ligula commodo euismod. Quisque sapien libero, aliquet
                sit amet orci sed, sollicitudin blandit ipsum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsInfo;
