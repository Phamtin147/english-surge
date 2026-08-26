import React, { useState, useEffect, useRef } from 'react';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><,./-=';

export default function DecryptedText({
  text,
  speed = 40,
  maxIterations = 10,
  sequential = true,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  className = '',
  parentClassName = '',
  encryptedClassName = 'text-indigo-400 font-mono opacity-80',
  animateOn = 'hover', // 'view', 'hover', 'mount'
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState(new Set());
  const containerRef = useRef(null);

  useEffect(() => {
    let interval;
    let iteration = 0;

    const startScramble = () => {
      setIsScrambling(true);
      iteration = 0;
      setRevealedIndices(new Set());

      interval = setInterval(() => {
        setDisplayText(() => {
          return text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              
              if (sequential) {
                const currentRevealed = Math.floor(
                  revealDirection === 'end'
                    ? text.length - (iteration / maxIterations) * text.length
                    : (iteration / maxIterations) * text.length
                );
                
                const isRevealed = revealDirection === 'end' 
                  ? index >= currentRevealed 
                  : index <= currentRevealed;

                if (isRevealed) {
                  return text[index];
                }
              }

              if (useOriginalCharsOnly) {
                const chars = text.replace(/\s/g, '');
                return chars[Math.floor(Math.random() * chars.length)];
              }
              return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
            })
            .join('');
        });

        iteration++;

        if (iteration > maxIterations) {
          clearInterval(interval);
          setDisplayText(text);
          setIsScrambling(false);
        }
      }, speed);
    };

    if (animateOn === 'mount') {
      startScramble();
    } else if (animateOn === 'hover' && isHovering) {
      startScramble();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [text, speed, maxIterations, sequential, revealDirection, useOriginalCharsOnly, animateOn, isHovering]);

  return (
    <span
      ref={containerRef}
      className={`inline-block ${parentClassName}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      <span className={className}>
        {displayText.split('').map((char, i) => {
          const isDecrypted = !isScrambling || char === text[i];
          return (
            <span
              key={i}
              className={isDecrypted ? className : encryptedClassName}
            >
              {char}
            </span>
          );
        })}
      </span>
    </span>
  );
}
