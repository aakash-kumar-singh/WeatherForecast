import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../ThemeToggle";

export const LoadingSpinner = ({ text = "Loading...", showOverlay = true }) => {
  const { isDark } = useTheme();
  const bgColor = isDark ? "bg-slate-950/80" : "bg-white/80";
  const dotColor = isDark ? "bg-indigo-400" : "bg-indigo-600";
  const textColor = isDark ? "text-indigo-300" : "text-indigo-700";
  const textBgColor = isDark ? "bg-indigo-500/10" : "bg-indigo-300/10";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${
        showOverlay ? `fixed inset-0 ${bgColor} backdrop-blur-sm` : "relative"
      } flex items-center justify-center`}
    >
      <div className="flex flex-col items-center gap-8">
        <div className="flex gap-3 items-center">
          {[1, 2, 3].map((_, i) => (
            <motion.div
              key={i}
              className={`w-4 h-4 rounded-full ${dotColor}`}
              animate={{
                y: ["0%", "-100%", "0%"],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        {text && (
          <motion.div
            className={`px-4 py-2 ${textBgColor} rounded-full`}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className={`${textColor} text-sm font-medium`}>{text}</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default LoadingSpinner;
