import { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";

const AnimatedNumber = ({ value, className }) => {
  const [prevValue, setPrevValue] = useState(value);
  
  useEffect(() => {
    setPrevValue(value);
  }, [value]);

  const { number } = useSpring({
    from: { number: prevValue },
    number: value,
    delay: 100,
    config: { mass: 1, tension: 120, friction: 14 },
  });

  return (
    <animated.span className={className}>
      {number.to((n) => Math.round(n))}
    </animated.span>
  );
};

export default AnimatedNumber;