import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import WeatherDashboard from "./pages/WeatherDashboard";
import FirstLoading from "./components/common/EnhancedLoadingSpinner";
import ThemeProvider from "./components/ThemeToggle";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loading animation for initial app load
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  return (
    <ThemeProvider>
      {isLoading && <FirstLoading />}
      <Routes>
        <Route path="/" element={<WeatherDashboard />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;