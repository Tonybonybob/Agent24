import React from 'react';

const Close =  ({ ...other }) => (
  <svg {...other} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" fill="black" fill-opacity="0"/>
    <path opacity="0.54" fill-rule="evenodd" clip-rule="evenodd" d="M7 10L12 15L17 10H7Z" />
  </svg>
);

export default Close;
