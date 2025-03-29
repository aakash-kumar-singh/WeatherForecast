import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cloud, 
  Sun, 
  Navigation, 
  Thermometer, 
  ChevronDown, 
  ChevronUp,
} from "lucide-react";
import { useTheme } from "../components/ThemeToggle";
import SearchBar from "../components/weather/SearchBar";
import WeatherCard from "../components/weather/WeatherCard";
import ForecastSection from "../components/weather/ForecastSection";
import ErrorMessage from "../components/weather/ErrorMessage";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { FloatingCubes } from "../components/common/FloatingCubes";
import HourlyForecast from "../components/weather/HourlyForecast";
import { 
  fetchWeatherData, 
  fetchForecastData,
  groupForecastByDay 
} from "../services/weatherService";

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem("recentSearches");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [currentCity, setCurrentCity] = useState("London");
  const [userLocation, setUserLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [useCelsius, setUseCelsius] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const { isDark } = useTheme();
  
  const getWeatherData = async (city) => {
    if (!city) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const weatherResponse = await fetchWeatherData(city);
      setWeatherData(weatherResponse);
      
      const forecastResponse = await fetchForecastData(city);
      const processedForecast = groupForecastByDay(forecastResponse);
      setForecastData(processedForecast);

      if (forecastResponse && forecastResponse.list) {
        setHourlyData(forecastResponse.list.slice(0, 8));
      }
      
      addToRecentSearches(city);
      
      setCurrentCity(city);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError(error.message || "Failed to fetch weather data. Please try again.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    getWeatherData(currentCity);
  };
  
  const handleSearch = (city) => {
    getWeatherData(city);
  };
  
  const addToRecentSearches = (city) => {
    const newSearches = recentSearches.filter(
      (item) => item.toLowerCase() !== city.toLowerCase()
    );
    
    newSearches.unshift(city);
    
    const limitedSearches = newSearches.slice(0, 5);
    
    setRecentSearches(limitedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(limitedSearches));
  };
  
  const handleClearSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };
  
  const handleSelectRecent = (city) => {
    getWeatherData(city);
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      setLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude });
            
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=bd5e378503939ddaee76f12ad7a97608&units=metric`
            );
            
            if (!response.ok) throw new Error("Failed to get location data");
            
            const data = await response.json();
            if (data.name) {
              setCurrentCity(data.name);
              getWeatherData(data.name);
            }
          } catch (error) {
            console.error("Error getting user location:", error);
            setError("Failed to get weather for your location. Please search manually.");
          } finally {
            setLoadingLocation(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLoadingLocation(false);
          setError("Unable to access your location. Please search manually.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser. Please search manually.");
    }
  };

  const toggleTemperatureUnit = () => {
    setUseCelsius(!useCelsius);
  };

  const convertTemperature = (temp) => {
    if (!useCelsius) {
      return (temp * 9/5) + 32;
    }
    return temp;
  };
  
  useEffect(() => {
    getWeatherData(currentCity);
  }, []);

  const formatSunTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className={`min-h-screen pb-8 ${isDark ? "bg-black" : "bg-white"}`}>
      <div
        className={`fixed inset-0 bg-gradient-to-b ${
          isDark
            ? "from-indigo-900/5 via-black to-black"
            : "from-indigo-100/50 via-white to-white"
        } -z-10`}
      />
      <div
        className={`fixed inset-0 ${
          isDark
            ? "bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_50%)]"
            : "bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_50%)]"
        } -z-10`}
      />
      
      <FloatingCubes />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center gap-3 mb-8"
        >
          <h1 className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            Weather Dashboard
          </h1>
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "200px", opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className={`h-1 rounded-full bg-gradient-to-r ${
              isDark 
                ? "from-gray-200/80 to-gray-300/50" 
                : "from-gray-500/70 to-gray-400/50"
            }`}
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-6"
        >
          <div 
            className={`flex p-1 rounded-full ${isDark ? "bg-gray-800" : "bg-gray-200"}`}
          >
            <button
              onClick={() => setUseCelsius(true)}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                useCelsius 
                  ? (isDark ? "bg-indigo-600 text-white" : "bg-indigo-500 text-white") 
                  : (isDark ? "text-gray-400" : "text-gray-600")
              }`}
            >
              °C
            </button>
            <button
              onClick={() => setUseCelsius(false)}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                !useCelsius 
                  ? (isDark ? "bg-indigo-600 text-white" : "bg-indigo-500 text-white") 
                  : (isDark ? "text-gray-400" : "text-gray-600")
              }`}
            >
              °F
            </button>
          </div>
        </motion.div>
        
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
            <div className="w-full">
              <SearchBar
                onSearch={handleSearch}
                recentSearches={recentSearches}
                onSelectRecent={handleSelectRecent}
                onClearSearches={handleClearSearches}
              />
            </div>
            
            <motion.button
              onClick={getUserLocation}
              disabled={loadingLocation}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 whitespace-nowrap px-4 py-3 rounded-lg
                        ${isDark 
                          ? "bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-400" 
                          : "bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-600"}
                        transition-colors disabled:opacity-50`}
            >
              {loadingLocation ? (
                <LoadingSpinner text="" showOverlay={false} />
              ) : (
                <>
                  <Navigation className="w-5 h-5" />
                  <span className="hidden sm:inline">Use My Location</span>
                  <span className="inline sm:hidden">Location</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center py-8"
            >
              <LoadingSpinner text="Fetching weather data..." showOverlay={false} />
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto"
            >
              <ErrorMessage message={error} />
            </motion.div>
          ) : weatherData ? (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 xl:col-span-4 lg:pt-12">
                  <WeatherCard 
                    weatherData={weatherData} 
                    onRefresh={handleRefresh}
                    isRefreshing={isRefreshing}
                    useCelsius={useCelsius}
                    convertTemperature={convertTemperature}
                  />
                  
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: showDetails ? 1 : 0,
                      height: showDetails ? "auto" : 0
                    }}
                    className="mt-4 overflow-hidden"
                  >
                    {showDetails && (
                      <div 
                        className={`p-6 rounded-lg border backdrop-blur-sm
                                  ${isDark 
                                    ? "bg-indigo-500/5 border-indigo-500/30" 
                                    : "bg-indigo-50/30 border-indigo-200"}`}
                      >
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`p-2 rounded-full mb-2 ${
                              isDark ? "bg-indigo-500/10" : "bg-indigo-100"
                            }`}>
                              <Thermometer className={isDark ? "text-indigo-400" : "text-indigo-600"} size={20} />
                            </div>
                            <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>Pressure</span>
                            <span className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                              {weatherData.main.pressure} hPa
                            </span>
                          </div>

                          <div className="flex flex-col items-center">
                            <div className={`p-2 rounded-full mb-2 ${
                              isDark ? "bg-indigo-500/10" : "bg-indigo-100"
                            }`}>
                              <Eye className={isDark ? "text-indigo-400" : "text-indigo-600"} size={20} />
                            </div>
                            <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>Visibility</span>
                            <span className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                              {(weatherData.visibility / 1000).toFixed(1)} km
                            </span>
                          </div>

                          <div className="flex flex-col items-center">
                            <div className={`p-2 rounded-full mb-2 ${
                              isDark ? "bg-amber-500/10" : "bg-amber-100"
                            }`}>
                              <Sunrise className={isDark ? "text-amber-400" : "text-amber-600"} size={20} />
                            </div>
                            <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>Sunrise</span>
                            <span className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                              {formatSunTime(weatherData.sys.sunrise)}
                            </span>
                          </div>

                          <div className="flex flex-col items-center">
                            <div className={`p-2 rounded-full mb-2 ${
                              isDark ? "bg-orange-500/10" : "bg-orange-100"
                            }`}>
                              <Sunset className={isDark ? "text-orange-400" : "text-orange-600"} size={20} />
                            </div>
                            <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>Sunset</span>
                            <span className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                              {formatSunTime(weatherData.sys.sunset)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>

                  <motion.button
                    onClick={() => setShowDetails(!showDetails)}
                    className={`flex items-center justify-center gap-2 mx-auto mt-3 px-4 py-2 rounded-full
                              ${isDark 
                                ? "bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400" 
                                : "bg-indigo-50 hover:bg-indigo-100 text-indigo-600"}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>
                      {showDetails ? "Hide Details" : "Show More Details"}
                    </span>
                    {showDetails ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </motion.button>
                </div>
                
                <div className="lg:col-span-7 xl:col-span-8">
                  <AnimatePresence>
                    {weatherData.weather[0].main.toLowerCase().includes('rain') && (
                      <RainAnimation isDark={isDark} />
                    )}
                    {weatherData.weather[0].main.toLowerCase().includes('snow') && (
                      <SnowAnimation isDark={isDark} />
                    )}
                  </AnimatePresence>

                  {hourlyData && (
                    <div className="mb-6">
                      <HourlyForecast 
                        hourlyData={hourlyData} 
                        useCelsius={useCelsius}
                        convertTemperature={convertTemperature}
                      />
                    </div>
                  )}

                  {forecastData && (
                    <ForecastSection 
                      forecastData={forecastData} 
                      useCelsius={useCelsius}
                      convertTemperature={convertTemperature}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Eye = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const Sunrise = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m12 2-3 3m3-3 3 3"/>
    <path d="M12 8v5"/>
    <path d="M5.2 18H2"/>
    <path d="M22 18h-3.2"/>
    <path d="M16 6H8"/>
    <path d="M5 12H2"/>
    <path d="M22 12h-3"/>
    <path d="m4 21 1-1.5"/>
    <path d="M19 21v0l-1-1.5"/>
    <circle cx="12" cy="18" r="4"/>
  </svg>
);

const Sunset = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m12 10 3-3m-3 3-3-3"/>
    <path d="M12 10v3"/>
    <path d="M5.2 18H2"/>
    <path d="M22 18h-3.2"/>
    <path d="M5 12H2"/>
    <path d="M22 12h-3"/>
    <path d="m4 21 1-1.5"/>
    <path d="M19 21v0l-1-1.5"/>
    <circle cx="12" cy="18" r="4"/>
  </svg>
);

const RainAnimation = ({ isDark }) => {
  const raindrops = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    duration: 0.6 + Math.random() * 0.7,
    delay: Math.random() * 2,
    width: 1 + Math.random() * 1.5,
    opacity: 0.3 + Math.random() * 0.5,
  }));

  return (
    <motion.div 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {raindrops.map((drop) => (
        <motion.div
          key={drop.id}
          className={`absolute w-0.5 rounded-full ${isDark ? "bg-blue-400" : "bg-blue-600"}`}
          style={{
            left: drop.left,
            width: `${drop.width}px`,
            opacity: drop.opacity,
            top: "-20px",
          }}
          animate={{
            y: ["0%", "120vh"],
          }}
          transition={{
            duration: drop.duration,
            repeat: Infinity,
            delay: drop.delay,
            ease: "linear",
          }}
        />
      ))}
    </motion.div>
  );
};

const SnowAnimation = ({ isDark }) => {
  const snowflakes = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: 3 + Math.random() * 7,
    duration: 10 + Math.random() * 20,
    delay: Math.random() * 5,
    rotation: Math.random() * 360,
  }));

  return (
    <motion.div 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.7 }}
      exit={{ opacity: 0 }}
    >
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className={`absolute rounded-full ${isDark ? "bg-blue-100" : "bg-white"} shadow-md`}
          style={{
            left: flake.left,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            top: "-20px",
          }}
          animate={{
            y: ["0%", "120vh"],
            x: ["-10px", "10px", "-10px"],
            rotate: [0, flake.rotation],
          }}
          transition={{
            y: {
              duration: flake.duration,
              repeat: Infinity,
              delay: flake.delay,
              ease: "linear",
            },
            x: {
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
            rotate: {
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        />
      ))}
    </motion.div>
  );
};

export default WeatherDashboard;