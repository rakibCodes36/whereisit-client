import successImg1 from "../../../assets/Ahmed Shafique.jpg";
import successImg2 from "../../../assets/Ali Hossain.jpg";
import successImg3 from "../../../assets/Hasan Mahmud.jpg";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Ahmed Shafique",
      feedback:
        "I lost my backpack during a trip, but thanks to this platform, a kind stranger helped me get it back within a day!",
      image: successImg1,
    },
    {
      id: 2,
      name: "Ali Hossain",
      feedback:
        "I found a lost wallet and reported it here. The owner reached out to me quickly, and we were able to connect easily.",
      image: successImg2,
    },
    {
      id: 3,
      name: "Hasan Mahmud",
      feedback:
        "The platform is amazing! I found my missing dog after someone listed it here. I’m so grateful for this service.",
      image: successImg3,
    },
  ];

  return (
    <div className=" px-8 mb-16 rounded-lg shadow-xl">
      <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
        What Our Users Say
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
          >
            <div className="w-24 h-24 mb-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-full h-full rounded-full object-cover border-4 border-blue-500"
              />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              {testimonial.name}
            </h3>
            <p className="text-gray-600 italic leading-relaxed">
              {testimonial.feedback}
            </p>
            <div className="mt-4">
              <span className="block w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg"></span>
            </div>
          </div>
        ))}
      </div>
    </div></div>
  );
};

export default Testimonials;
