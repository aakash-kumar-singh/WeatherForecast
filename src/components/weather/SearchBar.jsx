import { useState } from "react";
import { motion } from "framer-motion";
import { Search, X, History } from "lucide-react";
import { useTheme } from "../ThemeToggle";

const SearchBar = ({ onSearch, recentSearches, onSelectRecent, onClearSearches }) => {
  const [query, setQuery] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const { isDark } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery("");
      setShowHistory(false);
    }
  };

  const handleRecentSearch = (city) => {
    onSelectRecent(city);
    setShowHistory(false);
  };

  return (
    <div className="relative max-w-xl w-full mx-auto">
      <motion.form 
        onSubmit={handleSubmit}
        className="relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
          >
            <Search className={`w-5 h-5 ${isDark ? "text-indigo-400" : "text-indigo-600"}`} />
          </motion.div>
        </div>

        <input
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`w-full pl-12 pr-12 py-3 rounded-lg 
                   ${isDark ? "bg-indigo-500/10 border border-indigo-500/30 text-white placeholder-indigo-400" 
                           : "bg-indigo-50 border border-indigo-200 text-gray-800 placeholder-indigo-400"}
                   focus:outline-none focus:border-indigo-400 transition-colors`}
        />
        
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-14 top-1/2 -translate-y-1/2"
          >
            <X className={`w-5 h-5 ${isDark ? "text-indigo-400" : "text-indigo-600"}`} />
          </button>
        )}
        
        {recentSearches?.length > 0 && (
          <button
            type="button"
            onClick={() => setShowHistory(!showHistory)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <History className={`w-5 h-5 ${isDark ? "text-indigo-400" : "text-indigo-600"}`} />
          </button>
        )}
      </motion.form>
      
      {/* Recent searches dropdown */}
      {showHistory && recentSearches?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`absolute z-10 mt-2 w-full rounded-lg shadow-lg overflow-hidden
                    ${isDark ? "bg-gray-900 border border-indigo-500/30" 
                             : "bg-white border border-indigo-200"}`}
        >
          <div className={`flex justify-between items-center px-4 py-2 
                          ${isDark ? "border-b border-indigo-500/30" 
                                   : "border-b border-indigo-200"}`}>
            <span className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Recent Searches
            </span>
            <button
              onClick={() => {
                onClearSearches();
                setShowHistory(false);
              }}
              className={`text-xs ${isDark ? "text-indigo-400" : "text-indigo-600"} hover:underline`}
            >
              Clear All
            </button>
          </div>
          <ul>
            {recentSearches.map((city, index) => (
              <motion.li
                key={`${city}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ backgroundColor: isDark ? "rgba(99, 102, 241, 0.1)" : "rgba(99, 102, 241, 0.05)" }}
                className={`px-4 py-2 cursor-pointer ${isDark ? "hover:bg-indigo-500/10" : "hover:bg-indigo-50"}`}
                onClick={() => handleRecentSearch(city)}
              >
                <span className={isDark ? "text-white" : "text-gray-800"}>{city}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar;