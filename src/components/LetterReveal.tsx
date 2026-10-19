import React from 'react';

interface LetterRevealProps {
  text: string;
  className?: string;
  letterClassName?: string;
  baseDelay?: number;
  staggerMs?: number;
  isActive?: boolean;
}

export const LetterReveal: React.FC<LetterRevealProps> = ({
  text,
  className = '',
  letterClassName = '',
  baseDelay = 120,
  staggerMs = 28,
  isActive = true,
}) => {
  if (!isActive) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(' ');
  let charCounter = 0;

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, wordIndex) => {
        const chars = Array.from(word);
        return (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {chars.map((char, charIndex) => {
              const delay = baseDelay + charCounter * staggerMs;
              charCounter += 1;
              return (
                <span
                  key={charIndex}
                  className={`animate-letter-reveal inline-block ${letterClassName}`}
                  style={{ animationDelay: `${delay}ms` }}
                >
                  {char}
                </span>
              );
            })}
            {wordIndex < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        );
      })}
    </span>
  );
};

interface WordRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  baseDelay?: number;
  staggerMs?: number;
  isActive?: boolean;
}

export const WordReveal: React.FC<WordRevealProps> = ({
  text,
  className = '',
  wordClassName = '',
  baseDelay = 350,
  staggerMs = 32,
  isActive = true,
}) => {
  if (!isActive) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(' ');

  return (
    <span className={`inline ${className}`}>
      {words.map((word, index) => {
        const delay = baseDelay + index * staggerMs;
        return (
          <React.Fragment key={index}>
            <span
              className={`animate-word-reveal inline-block ${wordClassName}`}
              style={{ animationDelay: `${delay}ms` }}
            >
              {word}
            </span>
            {index < words.length - 1 && ' '}
          </React.Fragment>
        );
      })}
    </span>
  );
};
