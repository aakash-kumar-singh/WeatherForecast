// src/components/weather/ErrorMessage.jsx
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { useTheme } from "../ThemeToggle";

const ErrorMessage = ({ message }) => {
  const { isDark } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`w-full max-w-xl mx-auto p-4 rounded-lg border backdrop-blur-sm flex items-center
                ${isDark
                  ? "bg-red-500/10 border-red-500/30 text-red-300"
                  : "bg-red-50 border-red-200 text-red-600"}`}
    >
      <AlertTriangle className="h-5 w-5 mr-3 flex-shrink-0" />
      <div>
        <p className="font-medium">{message}</p>
        <p className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Please check the city name and try again.
        </p>
      </div>
    </motion.div>
  );
};

export default ErrorMessage;