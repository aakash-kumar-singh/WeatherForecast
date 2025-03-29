import { motion } from "framer-motion";
import { useTheme } from "../ThemeToggle";
import { Clock } from "lucide-react";
import { getWeatherIconUrl } from "../../services/weatherService";

const HourlyForecast = ({ hourlyData, useCelsius, convertTemperature }) => {
  const { isDark } = useTheme();
  
  if (!hourlyData || hourlyData.length === 0) return null;
  
  const formatTime = (dt) => {
    const date = new Date(dt * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full"
    >
      <div className="flex items-center mb-4">
        <Clock className={`h-5 w-5 mr-2 ${isDark ? "text-indigo-400" : "text-indigo-600"}`} />
        <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
          Hourly Forecast
        </h3>
      </div>
      
      <div 
        className={`overflow-x-auto pb-2 hide-scrollbar rounded-lg border ${
          isDark 
            ? "border-indigo-500/30 bg-indigo-500/5" 
            : "border-indigo-200/70 bg-indigo-50/30"
        }`}
      >
        <div className="flex space-x-4 p-4 min-w-max">
          {hourlyData.map((hour, index) => (
            <motion.div
              key={hour.dt}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              className={`flex flex-col items-center p-3 rounded-lg min-w-2 border-t-2
                ${isDark 
                  ? "bg-indigo-500/10 hover:bg-indigo-500/20" 
                  : "bg-white/50 hover:bg-white/80"}`}
            >
              <span 
                className={`text-sm font-medium mb-1
                          ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                {formatTime(hour.dt)}
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
                  src={getWeatherIconUrl(hour.weather[0].icon)} 
                  alt={hour.weather[0].description}
                  className="h-10 w-10" 
                />
              </div>
              
              <span 
                className={`text-base font-semibold mb-1
                          ${isDark ? "text-white" : "text-gray-800"}`}
              >
                {Math.round(convertTemperature(hour.main.temp))}°{useCelsius ? 'C' : 'F'}
              </span>
              
              <div className="flex items-center mt-1">
                <RainChance
                  probability={hour.pop * 100}
                  isDark={isDark}
                />
              </div>
              
              <span 
                className={`text-xs capitalize mt-1 text-center
                          ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                {hour.weather[0].description}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        
        .hide-scrollbar::-webkit-scrollbar-track {
          background: ${isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)'};
          border-radius: 10px;
        }
        
        .hide-scrollbar::-webkit-scrollbar-thumb {
          background: ${isDark ? 'rgba(99, 102, 241, 0.5)' : 'rgba(99, 102, 241, 0.3)'};
          border-radius: 10px;
        }
        
        .hide-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${isDark ? 'rgba(99, 102, 241, 0.7)' : 'rgba(99, 102, 241, 0.5)'};
        }
      `}</style>
    </motion.div>
  );
};

const RainChance = ({ probability, isDark }) => {
  if (!probability) return null;
  
  const roundedProbability = Math.round(probability);
  
  return (
    <div className="flex items-center">
      <svg 
        className={`w-3 h-3 mr-1 ${isDark ? "text-blue-400" : "text-blue-600"}`}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M7 19h10" />
        <path d="M13 5v7.5" />
        <path d="m9 9 4 3.5" />
        <path d="M9 13c0 2.21 1.79 4 4 4s4-1.79 4-4-1.79-4-4-4-4 1.79-4 4Z" />
      </svg>
      <span className={`text-xs ${isDark ? "text-blue-400" : "text-blue-600"}`}>
        {roundedProbability}%
      </span>
    </div>
  );
};

export default HourlyForecast;