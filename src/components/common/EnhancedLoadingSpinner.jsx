// src/components/common/EnhancedLoadingSpinner.jsx
import { motion } from "framer-motion";
import { Cloud, Sun, Droplets, Wind, Umbrella } from "lucide-react";
import { useTheme } from "../ThemeToggle";

const BackgroundIcon = ({ icon: Icon, darkColor, lightColor, isDark }) => (
  <motion.div
    initial={{
      opacity: 0.1,
      scale: 0.8,
      x: `${Math.random() * 100}vw`,
      y: `${Math.random() * 100}vh`,
    }}
    animate={{
      opacity: [0.1, 0.3, 0.1],
      scale: [0.8, 1.2, 0.8],
      x: `${Math.random() * 100}vw`,
      y: `${Math.random() * 100}vh`,
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="absolute pointer-events-none"
  >
    <Icon color={isDark ? darkColor : lightColor} size={60} />
  </motion.div>
);

const FirstLoading = () => {
  const { isDark } = useTheme();

  const backgroundIcons = [
    {
      icon: Cloud,
      darkColor: "rgba(29, 78, 216, 0.9)",
      lightColor: "rgba(29, 78, 216, 0.4)",
    },
    {
      icon: Sun,
      darkColor: "rgba(245, 158, 11, 0.9)",
      lightColor: "rgba(245, 158, 11, 0.4)",
    },
    {
      icon: Droplets,
      darkColor: "rgba(59, 130, 246, 0.9)",
      lightColor: "rgba(59, 130, 246, 0.4)",
    },
    {
      icon: Wind,
      darkColor: "rgba(37, 99, 235, 0.9)",
      lightColor: "rgba(37, 99, 235, 0.4)",
    },
    {
      icon: Umbrella,
      darkColor: "rgba(14, 116, 144, 0.9)",
      lightColor: "rgba(14, 116, 144, 0.4)",
    },
  ];

  return (
    <div
      className={`relative flex items-center justify-center min-h-screen overflow-hidden transition-all duration-500 ${
        isDark
          ? "bg-gradient-to-br from-black via-black to-gray-950"
          : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200"
      }`}
    >
      <div className="absolute inset-0">
        {backgroundIcons.map((iconData, index) =>
          [...Array(3)].map((_, subIndex) => (
            <BackgroundIcon
              key={`${index}-${subIndex}`}
              icon={iconData.icon}
              darkColor={iconData.darkColor}
              lightColor={iconData.lightColor}
              isDark={isDark}
            />
          ))
        )}
      </div>

      <div className="relative w-32 h-32">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute inset-0 border-4 rounded-full transition-all ${
              isDark ? "border-blue-500" : "border-blue-400"
            }`}
            initial={{ opacity: 0.2 }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.3, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
        <motion.div
          className={`absolute inset-0 border-4 rounded-full transition-all ${
            isDark ? "border-blue-900/20" : "border-blue-300/20"
          }`}
          animate={{
            scale: [1.1, 1.4, 1.1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
};

export default FirstLoading;
