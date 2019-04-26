import React from 'react';

const IPhone = ({ ...other }) => (
  <svg {...other} width="18" height="30" viewBox="0 0 18 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="17" height="29" rx="2.5" stroke="#D0D8DC" />
    <rect x="2" y="2" width="14" height="26" rx="1" fill="#D0D8DC" />
    <path d="M5 2H13V3C13 3.55228 12.5523 4 12 4H6C5.44772 4 5 3.55228 5 3V2Z" fill="white" />
  </svg>

);

export default IPhone;
