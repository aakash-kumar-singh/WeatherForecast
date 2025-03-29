import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cloud, Sun } from "lucide-react";
import { useTheme } from "../components/ThemeToggle";
import SearchBar from "../components/weather/SearchBar";
import WeatherCard from "../components/weather/WeatherCard";
import ForecastSection from "../components/weather/ForecastSection";
import ErrorMessage from "../components/weather/ErrorMessage";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { FloatingCubes } from "../components/common/FloatingCubes";
import { 
  fetchWeatherData, 
  fetchForecastData,
  groupForecastByDay 
} from "../services/weatherService";

const WeatherDashboard = () => {
  // State for current weather
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // State for search history
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem("recentSearches");
    return saved ? JSON.parse(saved) : [];
  });
  
  // State for default city
  const [currentCity, setCurrentCity] = useState("London");
  
  const { isDark } = useTheme();
  
  // Function to fetch weather data
  const getWeatherData = async (city) => {
    if (!city) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch current weather
      const weatherResponse = await fetchWeatherData(city);
      setWeatherData(weatherResponse);
      
      // Fetch 5-day forecast
      const forecastResponse = await fetchForecastData(city);
      const processedForecast = groupForecastByDay(forecastResponse);
      setForecastData(processedForecast);
      
      // Update recent searches
      addToRecentSearches(city);
      
      // Update current city
      setCurrentCity(city);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError(error.message || "Failed to fetch weather data. Please try again.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };
  
  // Function to refresh current weather
  const handleRefresh = () => {
    setIsRefreshing(true);
    getWeatherData(currentCity);
  };
  
  // Function to handle search
  const handleSearch = (city) => {
    getWeatherData(city);
  };
  
  // Function to add to recent searches
  const addToRecentSearches = (city) => {
    // Don't add duplicates, move to top if exists
    const newSearches = recentSearches.filter(
      (item) => item.toLowerCase() !== city.toLowerCase()
    );
    
    // Add new city to the beginning
    newSearches.unshift(city);
    
    // Keep only the last 5 searches
    const limitedSearches = newSearches.slice(0, 5);
    
    setRecentSearches(limitedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(limitedSearches));
  };
  
  // Function to clear recent searches
  const handleClearSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };
  
  // Function to handle selection from recent searches
  const handleSelectRecent = (city) => {
    getWeatherData(city);
  };
  
  // Fetch default weather data on component mount
  useEffect(() => {
    getWeatherData(currentCity);
  }, []);
  
  return (
    <div className={`min-h-screen pb-16 ${isDark ? "bg-black" : "bg-white"}`}>
      <div
        className={`absolute inset-0 bg-gradient-to-b ${
          isDark
            ? "from-indigo-900/5 via-black to-black"
            : "from-indigo-100/50 via-white to-white"
        }`}
      />
      <div
        className={`absolute inset-0 ${
          isDark
            ? "bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_50%)]"
            : "bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_50%)]"
        }`}
      />
      
      <FloatingCubes />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <Cloud className={`w-8 h-8 ${isDark ? "text-indigo-400" : "text-indigo-600"}`} />
          <h1 className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            Weather Dashboard
          </h1>
          <Sun className={`w-8 h-8 ${isDark ? "text-indigo-400" : "text-indigo-600"}`} />
        </motion.div>
        
        <SearchBar
          onSearch={handleSearch}
          recentSearches={recentSearches}
          onSelectRecent={handleSelectRecent}
          onClearSearches={handleClearSearches}
        />
        
        <div className="mt-8">
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
                <WeatherCard 
                  weatherData={weatherData} 
                  onRefresh={handleRefresh}
                  isRefreshing={isRefreshing}
                />
                {forecastData && <ForecastSection forecastData={forecastData} />}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;