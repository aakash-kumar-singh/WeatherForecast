import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useTheme } from "../ThemeToggle";
import ForecastCard from "./ForecastCard";

const ForecastSection = ({ forecastData, useCelsius, convertTemperature }) => {
  const { isDark } = useTheme();

  if (!forecastData || forecastData.length === 0) return null;

  const fiveDayForecast = forecastData.slice(0, 5);

  const processedForecast = fiveDayForecast.map((day) => ({
    ...day,
    temp: Math.round(convertTemperature(day.temp)),
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full"
    >
      <div className="flex items-center mb-4">
        <Calendar
          className={`h-5 w-5 mr-2 ${
            isDark ? "text-indigo-400" : "text-indigo-600"
          }`}
        />
        <h3
          className={`text-lg font-semibold ${
            isDark ? "text-white" : "text-gray-800"
          }`}
        >
          5-Day Forecast
        </h3>
      </div>

      <div
        className={`p-4 rounded-lg border ${
          isDark
            ? "border-indigo-500/30 bg-indigo-500/5"
            : "border-indigo-200/70 bg-indigo-50/30"
        }`}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {processedForecast.map((forecast, index) => (
            <ForecastCard
              key={forecast.date}
              forecast={forecast}
              index={index}
              useCelsius={useCelsius}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ForecastSection;
