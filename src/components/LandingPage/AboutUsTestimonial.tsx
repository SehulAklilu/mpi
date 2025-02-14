import bgImage from "../../assets/landingpage/choose-the-right-boarding-school.jpg";

const testimonials = [
  {
    id: 1,
    name: "Kc Brown",
    role: "Product Designer",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at nisl non arcu gravida euismod. Nullam felis dui, dapibus..",
    rating: 5,
    image: "https://i.pravatar.cc/100?img=8", // Replace with actual image URL
  },
  {
    id: 2,
    name: "Kc Brown",
    role: "Product Designer",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at nisl non arcu gravida euismod. Nullam felis dui, dapibus..",
    rating: 5,
    image: "https://i.pravatar.cc/100?img=8",
  },
  {
    id: 3,
    name: "Kc Brown",
    role: "Product Designer",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at nisl non arcu gravida euismod. Nullam felis dui, dapibus..",
    rating: 5,
    image: "https://i.pravatar.cc/100?img=8",
  },
  {
    id: 4,
    name: "Kc Brown",
    role: "Product Designer",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at nisl non arcu gravida euismod. Nullam felis dui, dapibus..",
    rating: 5,
    image: "https://i.pravatar.cc/100?img=8",
  },
];

function AboutUsTestimonial() {
  return (
    <div
      className="relative h-auto min-h-[50rem] bg-cover bg-center bg-no-repeat flex items-center justify-center px-2 md:px-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="">
        <h1 className="text-white text-center text-4xl md:text-6xl font-semibold mb-10">
          Thousands Speak Proudly Of Us!
        </h1>
        <div className="bg-black w-fit mx-auto p-4 md:p-10 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-6 rounded-xl shadow-lg max-w-sm"
              >
                <div className="flex items-center gap-2 mb-4">
                  {Array.from({ length: testimonial.rating }).map(
                    (_, index) => (
                      <span key={index} className="text-yellow-500 text-lg">
                        ★
                      </span>
                    )
                  )}
                </div>
                <p className="text-gray-700 mb-4 text-start">
                  {testimonial.review}
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col items-start">
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsTestimonial;
