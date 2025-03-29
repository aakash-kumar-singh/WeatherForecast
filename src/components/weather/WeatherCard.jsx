// src/components/weather/WeatherCard.jsx
import { motion } from "framer-motion";
import { Wind, Droplets, RefreshCw, MapPin, Calendar, Clock } from "lucide-react";
import { useTheme } from "../ThemeToggle";
import { getWeatherIconUrl, formatDate, formatTime } from "../../services/weatherService";
import AnimatedNumber from "./AnimatedNumber";

const WeatherCard = ({ weatherData, onRefresh, isRefreshing, useCelsius, convertTemperature }) => {
  const { isDark } = useTheme();

  if (!weatherData) return null;

  const {
    name,
    main: { temp, humidity, feels_like },
    weather,
    wind,
    sys,
    dt,
  } = weatherData;

  const weatherCondition = weather[0].main;
  const weatherDescription = weather[0].description;
  const windSpeed = wind.speed;
  const iconCode = weather[0].icon;
  const country = sys.country;

  const displayTemp = Math.round(convertTemperature(temp));
  const displayFeelsLike = Math.round(convertTemperature(feels_like));

  const getBackgroundGradient = () => {
    const isDay = iconCode.includes('d');
    
    if (weatherCondition.toLowerCase().includes('clear')) {
      return isDay 
        ? (isDark ? "from-amber-900/30 to-orange-900/30" : "from-amber-400/20 to-orange-300/30")
        : (isDark ? "from-indigo-900/30 to-violet-900/30" : "from-indigo-400/20 to-violet-300/20");
    }
    
    if (weatherCondition.toLowerCase().includes('cloud')) {
      return isDay 
        ? (isDark ? "from-zinc-800/40 to-slate-900/40" : "from-zinc-300/30 to-slate-200/30")
        : (isDark ? "from-slate-800/40 to-zinc-900/40" : "from-slate-300/30 to-zinc-200/30");
    }
    
    if (weatherCondition.toLowerCase().includes('rain') || weatherCondition.toLowerCase().includes('drizzle')) {
      return isDay 
        ? (isDark ? "from-teal-900/30 to-slate-900/30" : "from-teal-400/20 to-slate-300/30")
        : (isDark ? "from-slate-900/40 to-teal-900/30" : "from-slate-400/20 to-teal-300/20");
    }
    
    if (weatherCondition.toLowerCase().includes('snow')) {
      return isDark ? "from-slate-800/40 to-gray-900/40" : "from-slate-300/30 to-gray-100/30";
    }
    
    if (weatherCondition.toLowerCase().includes('thunder')) {
      return isDark ? "from-violet-900/30 to-gray-900/30" : "from-violet-400/20 to-gray-300/30";
    }
    
    return isDark ? "from-zinc-900/30 to-gray-900/30" : "from-zinc-300/20 to-gray-200/20";
  };

  const getWeatherAnimation = () => {
    if (weatherCondition.toLowerCase().includes('clear')) {
      return <SunAnimation isDark={isDark} isDay={iconCode.includes('d')} />;
    }
    if (weatherCondition.toLowerCase().includes('cloud')) {
      return <CloudAnimation isDark={isDark} />;
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-xl mx-auto group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-zinc-500 to-stone-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300" />
      
      <div
        className={`relative p-6 rounded-lg border backdrop-blur-sm transition-colors duration-300
                   bg-gradient-to-br ${getBackgroundGradient()}
                   ${isDark
                     ? "border-zinc-700/50 group-hover:border-zinc-600/70"
                     : "border-zinc-300/50 group-hover:border-zinc-400/70"}`}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center space-x-2">
            <MapPin className={`h-5 w-5 ${isDark ? "text-indigo-400" : "text-indigo-600"}`} />
            <h2 className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
              {name}, {country}
            </h2>
          </div>
          
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className={`p-2 rounded-full transition-all
                      ${isDark
                        ? "text-indigo-400 hover:bg-indigo-500/20 disabled:text-gray-500"
                        : "text-indigo-600 hover:bg-indigo-100 disabled:text-gray-400"}`}
          >
            <motion.div
              animate={isRefreshing ? { rotate: 360 } : {}}
              transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0, ease: "linear" }}
            >
              <RefreshCw className="h-5 w-5" />
            </motion.div>
          </button>
        </div>
        
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center">
            <Calendar className={`h-4 w-4 mr-1 ${isDark ? "text-indigo-400" : "text-indigo-600"}`} />
            <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              {formatDate(dt)}
            </span>
          </div>
          <div className="flex items-center">
            <Clock className={`h-4 w-4 mr-1 ${isDark ? "text-indigo-400" : "text-indigo-600"}`} />
            <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              {formatTime(dt)}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={getWeatherIconUrl(iconCode)}
                alt={weatherDescription}
                className="w-24 h-24 object-contain"
              />
              {getWeatherAnimation()}
            </div>
            
            <div className="text-center mt-1">
              <div className="flex items-center justify-center">
                <AnimatedNumber
                  value={displayTemp}
                  className={`text-4xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}
                />
                <span className={`text-2xl ml-1 ${isDark ? "text-white" : "text-gray-800"}`}>
                  °{useCelsius ? 'C' : 'F'}
                </span>
              </div>
              <p className={`capitalize text-lg mt-1 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                {weatherDescription}
              </p>
            </div>
          </div>
          
          <div className="w-full sm:hidden h-px bg-gradient-to-r from-transparent via-gray-400/30 to-transparent my-2" />
          
          <div className="space-y-4 w-full sm:w-auto">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${
                  isDark ? "bg-zinc-700/20" : "bg-zinc-200/60"
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative"
                >
                  <Sun className={`h-5 w-5 ${isDark ? "text-amber-400" : "text-amber-600"}`} />
                </motion.div>
              </div>
              <div>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  Feels like
                </p>
                <p className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                  {displayFeelsLike}°{useCelsius ? 'C' : 'F'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${
                  isDark ? "bg-indigo-500/10" : "bg-indigo-100/60"
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative"
                >
                  <Droplets className={`h-5 w-5 ${isDark ? "text-teal-400" : "text-teal-600"}`} />
                </motion.div>
              </div>
              <div>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  Humidity
                </p>
                <p className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                  {humidity}%
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${
                  isDark ? "bg-indigo-500/10" : "bg-indigo-100/60"
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative"
                >
                  <Wind className={`h-5 w-5 ${isDark ? "text-gray-400" : "text-gray-600"}`} />
                </motion.div>
              </div>
              <div>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  Wind
                </p>
                <p className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                  {Math.round(windSpeed * 3.6)} km/h
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SunAnimation = ({ isDark, isDay }) => {
  const color = isDay 
    ? (isDark ? "text-amber-400" : "text-amber-500") 
    : (isDark ? "text-indigo-300" : "text-indigo-400");
  
  return (
    <motion.div 
      className={`absolute inset-0 ${color} opacity-20 rounded-full`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

const CloudAnimation = ({ isDark }) => {
  return (
    <motion.div 
      className={`absolute inset-0 rounded-full ${isDark ? "bg-gray-500" : "bg-gray-300"} opacity-10`}
      animate={{
        scale: [1, 1.1, 1],
        x: [0, 5, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

const Sun = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2"/>
    <path d="M12 20v2"/>
    <path d="m4.93 4.93 1.41 1.41"/>
    <path d="m17.66 17.66 1.41 1.41"/>
    <path d="M2 12h2"/>
    <path d="M20 12h2"/>
    <path d="m6.34 17.66-1.41 1.41"/>
    <path d="m19.07 4.93-1.41 1.41"/>
  </svg>
);

export default WeatherCard;