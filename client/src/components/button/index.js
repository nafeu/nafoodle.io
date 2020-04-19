import React from 'react';
import { useSpring, animated, config } from 'react-spring';

export const Button = ({ className, onClick, label }) => {
  const [{ y }, set] = useSpring(() => ({ y: 0, config: config.wobbly }));

  return (
    <animated.div
      className={className}
      style={{ transform: y.interpolate(v => `translateY(${v}%)`) }}
      onClick={onClick}
      onMouseDown={() => set({ y: 5 })}
      onMouseUp={() => set({ y: 0 })}
      onMouseEnter={() => set({ y: -5 })}
      onMouseLeave={() => set({ y: 0 })}
    >
      {label}
    </animated.div>
  )
}