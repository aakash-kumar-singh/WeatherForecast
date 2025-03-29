import { motion } from "framer-motion";
import { getWeatherIconUrl } from "../../services/weatherService";
import { useTheme } from "../ThemeToggle";

const ForecastCard = ({ forecast, index, useCelsius }) => {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
      className={`flex flex-col items-center p-3 rounded-lg border backdrop-blur-sm
                ${
                  isDark
                    ? "bg-indigo-500/5 border-indigo-500/20 hover:border-indigo-400/40"
                    : "bg-indigo-50/30 border-indigo-200/50 hover:border-indigo-300/70"
                }`}
    >
      <span
        className={`text-sm font-medium mb-1
                  ${isDark ? "text-gray-300" : "text-gray-700"}`}
      >
        {forecast.day}
      </span>

      <div className="relative my-1">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
        />
        <img
          src={getWeatherIconUrl(forecast.icon)}
          alt={forecast.description}
          className="h-10 w-10"
        />
      </div>

      <span
        className={`text-base font-semibold
                  ${isDark ? "text-white" : "text-gray-800"}`}
      >
        {forecast.temp}°{useCelsius ? "C" : "F"}
      </span>

      <span
        className={`text-xs capitalize mt-1 text-center
                  ${isDark ? "text-gray-400" : "text-gray-600"}`}
      >
        {forecast.description}
      </span>
    </motion.div>
  );
};

export default ForecastCard;
