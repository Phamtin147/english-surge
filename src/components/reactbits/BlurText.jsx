import React from 'react';
import { motion } from 'framer-motion';

export default function BlurText({
  text = '',
  delay = 50,
  className = '',
  animateBy = 'words', // 'words' or 'letters'
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = 'easeOut',
  onAnimationComplete,
}) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  const defaultFrom =
    direction === 'top'
      ? { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,-20px,0)' }
      : { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,20px,0)' };

  const defaultTo = [
    {
      filter: 'blur(4px)',
      opacity: 0.7,
      transform: direction === 'top' ? 'translate3d(0,4px,0)' : 'translate3d(0,-4px,0)',
    },
    { filter: 'blur(0px)', opacity: 1, transform: 'translate3d(0,0,0)' },
  ];

  return (
    <p className={`inline-flex flex-wrap gap-x-1.5 ${className}`}>
      {elements.map((element, index) => (
        <motion.span
          key={index}
          initial={animationFrom || defaultFrom}
          animate={animationTo || defaultTo[1]}
          transition={{
            duration: 0.45,
            delay: (index * delay) / 1000,
            ease: easing,
          }}
          className="inline-block"
          onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
        >
          {element === ' ' ? '\u00A0' : element}
        </motion.span>
      ))}
    </p>
  );
}
