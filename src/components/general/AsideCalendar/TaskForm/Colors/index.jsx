import React from 'react';
import './style.scss';
const Colors = ({ color, onChange }) => {
  const colors = ['#FFF', '#F2C94C', '#6FCF97', '#BB6BD9', '#50C2E7', '#F88181', '#0097A7'];

  return (
    <div className="task-colors">
      {colors.map((el, key) => (
        <div
          className={`task-colors__item ${color === el ? 'task-colors__item--active' : ''}`}
          key={el}
          style={{ background: el }}
          onClick={() => onChange(el)}
        />
      ))}
    </div>
  );
};

export default Colors;
