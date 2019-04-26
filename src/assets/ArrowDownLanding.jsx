import React from 'react';

const ArrowDownLanding = ({ ...other }) => (
  <svg {...other} width="76" height="90" viewBox="0 0 76 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_dd)">
      <rect x="14" y="14" width="48" height="48" rx="24" fill="#009688" />
      <rect x="14.25" y="14.25" width="47.5" height="47.5" rx="23.75" stroke="url(#paint0_linear)" strokeWidth="0.5" />
      <rect x="14.25" y="14.25" width="47.5" height="47.5" rx="23.75" stroke="url(#paint1_linear)" strokeWidth="0.5" />
    </g>
    <rect x="14" y="14" width="48" height="48" rx="24" fill="#FFC000" />
    <path fillRule="evenodd" clipRule="evenodd" d="M46 38L44.6 36.6L39 42.2L39 30L37 30L37 42.2L31.4 36.6L30 38L38 46L46 38Z" fill="#121212" />
    <defs>
      <filter id="filter0_dd" x="0" y="0" width="76" height="90" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dy="14" />
        <feGaussianBlur stdDeviation="7" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.237602 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset />
        <feGaussianBlur stdDeviation="7" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
        <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape" />
      </filter>
      <linearGradient id="paint0_linear" x1="14.2349" y1="14" x2="14.2349" y2="61.5303" gradientUnits="userSpaceOnUse">
        <stop stopOpacity="0" />
        <stop offset="0.8" stopOpacity="0.02" />
        <stop offset="1" stopOpacity="0.04" />
      </linearGradient>
      <linearGradient id="paint1_linear" x1="14" y1="14" x2="14" y2="62" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" stopOpacity="0.12" />
        <stop offset="0.2" stopColor="white" stopOpacity="0.06" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

export default ArrowDownLanding;
