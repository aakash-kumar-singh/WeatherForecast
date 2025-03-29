import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useTheme } from "../ThemeToggle";
import ForecastCard from "./ForecastCard";

const ForecastSection = ({ forecastData }) => {
  const { isDark } = useTheme();
  
  if (!forecastData || forecastData.length === 0) return null;
  
  // Take only the first 5 days
  const fiveDayForecast = forecastData.slice(0, 5);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-xl mx-auto mt-6"
    >
      <div className="flex items-center mb-4">
        <Calendar className={`h-5 w-5 mr-2 ${isDark ? "text-indigo-400" : "text-indigo-600"}`} />
        <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
          5-Day Forecast
        </h3>
      </div>
      
      <div className="grid grid-cols-5 gap-2">
        {fiveDayForecast.map((forecast, index) => (
          <ForecastCard key={forecast.date} forecast={forecast} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default ForecastSection;