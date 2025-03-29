import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import WeatherDashboard from "./pages/WeatherDashboard";
import ThemeProvider from "./components/ThemeToggle";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<WeatherDashboard />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;