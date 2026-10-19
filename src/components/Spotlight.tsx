import React from 'react';

export const Spotlight: React.FC = () => {
  return (
    <svg
      className="animate-spotlight pointer-events-none fixed -top-40 left-0 md:-left-10 lg:left-0 md:-top-20 z-[1] h-[200%] w-[220%] lg:w-[185%] opacity-0 dark:opacity-100 transition-opacity duration-700 overflow-visible"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
      aria-hidden="true"
    >
      <g filter="url(#filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="2700"
          ry="620"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill="white"
          fillOpacity="0.32"
        />
      </g>
      <defs>
        <filter
          id="filter"
          x="-600"
          y="-600"
          width="4987"
          height="4042"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="165" result="effect1_foregroundBlur_1065_8" />
        </filter>
      </defs>
    </svg>
  );
};
