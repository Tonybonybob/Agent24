import React from 'react';

const MinusRounded = ({ ...other }) => (
  <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="8" y="8" width="112" height="112">
      <circle opacity="0.72" cx="64" cy="64" r="56" fill="#F2C94C" />
    </mask>
    <g mask="url(#mask0)">
      <circle cx="64" cy="64" r="32" stroke="#FFA000" stroke-width="2" />
      <circle cx="64" cy="64" r="37.5" stroke="#FFA000" />
      <circle cx="64" cy="64" r="25.5" fill="#FFA000" stroke="#FFF8D4" stroke-width="3" />
      <rect opacity="0.48" x="49" y="52" width="30" height="24" rx="4" fill="white" />
    </g>
    <g opacity="0.72">
      <circle cx="64" cy="64" r="60" stroke="#F2C94C" stroke-width="8" />
      <circle cx="64" cy="64" r="60" stroke="url(#paint0_linear)" stroke-width="8" />
    </g>
    <defs>
      <linearGradient id="paint0_linear" x1="0" y1="64" x2="128" y2="64" gradientUnits="userSpaceOnUse">
        <stop stop-color="#F2C94C" />
        <stop offset="1" stop-color="#F2994A" />
      </linearGradient>
    </defs>
  </svg>
);

export default MinusRounded;