import { motion } from "framer-motion";

const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-white text-sm">Typing</span>
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-2 h-2 bg-green-500 rounded-full"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TypingIndicator;
