import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sliderImg1 from "../../../assets/slider-1.jpg";
import sliderImg2 from "../../../assets/slider-2.jpg";
import sliderImg3 from "../../../assets/slider-3.jpg";
import sliderImg4 from "../../../assets/slider-4.jpg";

const Slider = () => {
  const [activeSlide, setActiveSlide] = useState(1);
  const totalSlides = 4;

  const slides = [
    {
      id: 1,
      image: sliderImg1,
      title: "Welcome to WhereIsIt",
      description:
        "A platform to connect those who have lost belongings with those who have found them.",
    },
    {
      id: 2,
      image: sliderImg2,
      title: "Lost Something?",
      description:
        "Report your lost items and let us help you find them.",
    },
    {
      id: 3,
      image: sliderImg3,
      title: "Found Something?",
      description:
        "List found items and help reunite them with their owners.",
    },
    {
      id: 4,
      image: sliderImg4,
      title: "Easy Recovery Process",
      description:
        "Simplifying the process of recovering lost items for everyone.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === totalSlides ? 1 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  const slideVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  const textVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 },
  };

  return (
    <div className="relative flex justify-center items-center overflow-hidden ">
      <div className="relative w-full max-w-7xl h-[545px]">
        <AnimatePresence>
          {slides
            .filter((slide) => slide.id === activeSlide)
            .map((slide) => (
              <motion.div
                key={slide.id}
                className="absolute w-full h-full"
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <motion.div
                  className="absolute max-w-[70%] left-5 bottom-8 text-white bg-black bg-opacity-50 p-4 rounded-lg"
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                >
                  <h3 className="text-lg md:text-2xl font-bold mb-2">
                    {slide.title}
                  </h3>
                  <p className="text-base md:text-lg">{slide.description}</p>
                </motion.div>
              </motion.div>
            ))}
        </AnimatePresence>
        <div className="absolute left-5 right-5 top-1/2 hidden md:flex -translate-y-1/2 transform justify-between">
          <button
            onClick={() =>
              setActiveSlide(activeSlide === 1 ? totalSlides : activeSlide - 1)
            }
            className="btn btn-circle"
          >
            ❮
          </button>
          <button
            onClick={() =>
              setActiveSlide(activeSlide === totalSlides ? 1 : activeSlide + 1)
            }
            className="btn btn-circle"
          >
            ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
