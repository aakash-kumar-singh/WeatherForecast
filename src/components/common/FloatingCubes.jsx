import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const FloatingCubes = () => {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1920,
    height: typeof window !== "undefined" ? window.innerHeight : 1080,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gridColumns = 4;
  const gridRows = 3;

  const cubes = Array.from({ length: 12 }).map((_, index) => {
    const gridX = index % gridColumns;
    const gridY = Math.floor(index / gridColumns) % gridRows;

    const cellWidth = dimensions.width / gridColumns;
    const cellHeight = dimensions.height / gridRows;

    const initialX = gridX * cellWidth + Math.random() * cellWidth * 0.8;
    const initialY = gridY * cellHeight + Math.random() * cellHeight * 0.8;

    return {
      duration: Math.random() * 15 + 10,
      initialX,
      initialY,
      destX: Math.random() * dimensions.width * 0.8 + dimensions.width * 0.1,
      destY: Math.random() * dimensions.height * 0.8 + dimensions.height * 0.1,
    };
  });

  return (
    <div className="fixed inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
      {cubes.map((cube, i) => (
        <motion.div
          key={i}
          className="absolute w-8 h-8 border border-indigo-500"
          initial={{
            x: cube.initialX,
            y: cube.initialY,
            rotate: 0,
          }}
          animate={{
            x: [cube.initialX, cube.destX, cube.initialX],
            y: [cube.initialY, cube.destY, cube.initialY],
            rotate: 360,
          }}
          transition={{
            duration: cube.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};
