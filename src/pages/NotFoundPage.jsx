import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { FloatingCubes } from "../components/common/FloatingCubes";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 via-black to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_50%)]" />
      <FloatingCubes />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-9xl font-bold text-white mb-4"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl text-gray-400 mb-8 text-center"
        >
          Oops! Looks like you've ventured into the void.
        </motion.p>

        <motion.button
          onClick={() => navigate("/")}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-indigo-500/10 border border-indigo-500/30
                   text-indigo-400 rounded-full hover:bg-indigo-500/20
                   hover:border-indigo-400 transition-all duration-300
                   flex items-center gap-2"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </motion.button>
      </div>
    </div>
  );
};

export default NotFoundPage;
