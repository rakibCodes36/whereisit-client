import { motion } from "framer-motion";
import { FaPaperPlane, FaSearch, FaHandshake } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      title: "Report",
      description: "Report your lost or found items in just a few clicks.",
      icon: <FaPaperPlane />,
      color: "#3498db",
    },
    {
      title: "Search",
      description: "Browse through listed items to find a match.",
      icon: <FaSearch />,
      color: "#2ecc71",
    },
    {
      title: "Reunite",
      description: "Connect with the owner or finder to recover the item.",
      icon: <FaHandshake />,
      color: "#f39c12",
    },
  ];

  const iconAnimation = {
    animate: {
      scale: [1, 1.3, 1],  
    },
    transition: {
      repeat: Infinity,
      duration: 5,
      ease: "easeInOut",  
    },
  };
  

  return (
    <section className="py-16 bg-gradient-to-b from-blue-100 via-purple-100 to-pink-100 mb-10">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
        How It Works
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.3,
            }}
          >
            <motion.div
              className="text-6xl mb-6 inline-block"
              style={{ color: step.color }}
              {...iconAnimation}
            >
              {step.icon}
            </motion.div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              {step.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
