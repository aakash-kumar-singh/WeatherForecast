import { createContext, useState, useContext, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") return true;
    if (savedTheme === "light") return false;

    return savedTheme ? JSON.parse(savedTheme) : true;
  });

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
      <ThemeToggle />
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

const ThemeToggle = () => {
  const { isDark, setIsDark } = useTheme();

  return (
    <>
      <motion.button
        onClick={() => setIsDark(!isDark)}
        className={`fixed bottom-6 left-6 p-3 rounded-full z-50
          backdrop-blur-sm focus:outline-none focus:ring-2 transition-all duration-300 
          hover:-translate-y-1 hover:scale-110 active:scale-95 border
          ${
            isDark
              ? "bg-gradient-to-r from-indigo-500/20 to-indigo-500/20 border-indigo-500/30 text-indigo-400 focus:ring-indigo-500/20"
              : "bg-gradient-to-r from-amber-400/20 to-orange-400/20 border-orange-400/30 text-orange-100 focus:ring-orange-400/20"
          }`}
        aria-label="Toggle theme"
      >
        <div className="relative">
          {/* Primary glow effect */}
          <div
            className={`absolute inset-0 rounded-full blur-md opacity-30 animate-pulse
              ${
                isDark
                  ? "bg-blue-500"
                  : "bg-gradient-to-r from-amber-200 to-orange-100"
              }`}
          />
          {/* Secondary glow effect */}
          <div
            className={`absolute inset-0 rounded-full blur-lg opacity-20 
              ${isDark ? "bg-indigo-500" : "bg-yellow-400"}`}
          />
          {/* Icon */}
          <div className="relative z-10">
            {isDark ? (
              <Moon className="w-6 h-6 text-indigo-400" />
            ) : (
              <Sun className="w-6 h-6 text-orange-400" />
            )}
          </div>
          {/* Heartbeat animated border */}
          <div
            className={`absolute inset-0 border-2 rounded-full animate-[heartbeat_4s_ease-in-out_infinite] 
              ${isDark ? "border-indigo-500/20" : "border-amber-400/50"}`}
          />
        </div>
      </motion.button>

      {/* Keyframes for heartbeat effect */}
      <style>
        {`
          @keyframes heartbeat {
            0% { transform: scale(1); opacity: 1; }
            30% { transform: scale(1.5); opacity: 0.8; }
            60% { transform: scale(1); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </>
  );
};

export default ThemeProvider;
