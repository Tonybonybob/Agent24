import React from 'react';

const DefaultAvatar = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0" maskType="alpha" maskUnits="userSpaceOnUse" x="0" y="0">
      <path d="M0 2C0 0.895429 0.895431 0 2 0H198C199.105 0 200 0.895431 200 2V200H0V2Z" fill="#DEF0F4" />
    </mask>
    <g mask="url(#mask0)">
      <path d="M0 2C0 0.895428 0.89543 0 2 0H395C396.105 0 397 0.895431 397 2V346H0V2Z" transform="translate(-104 -66)" fill="#DCECF3" />
      <path d="M135 82.538C135 82.5557 135 82.5734 135 82.5956C117.16 98.8301 93.4779 108.719 67.5022 108.719C41.5221 108.719 17.84 98.8301 0 82.5956C0 82.5734 0 82.5557 0 82.538C0 55.5367 15.7454 10.8777 38.5216 0C47.0814 8.56731 57.104 13.1836 67.5022 13.1836C77.9048 13.1836 87.923 8.56731 96.4873 0C119.263 10.8777 135 55.5367 135 82.538Z" transform="translate(30 118.281)" fill="#1EA6C6" />
      <path d="M37.3372 0C57.9569 0 74.6745 16.771 74.6745 37.462C74.6745 58.1575 57.9569 86.458 37.3372 86.458C16.7176 86.458 -1.07889e-06 58.1575 -1.07889e-06 37.462C-1.07889e-06 16.771 16.7176 0 37.3372 0Z" transform="translate(60.1641 33)" fill="#FCD09F" />
    </g>
  </svg>
);

export default DefaultAvatar;
