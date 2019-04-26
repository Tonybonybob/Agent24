import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
class Title extends Component {
  render() {
    const { tag, title, description, className, align} = this.props;
    const tagBlock = tag?(
      <div 
        className="title__tag"
      >
        {tag}
      </div>
    ) : null;
    const titleBlock = title?(
      <div 
        className="title__title"
      >
        {title}
      </div>
    ) : null;
    const descriptionBlock = description?(
      <div 
        className="title__description"
      >
        {description}
      </div>
    ) : null;
    return(
      <div 
        className={
          `title
          ${className?className:''}
          ${align&&align=='left'?'title_left':''}
        `}
      >
        {tagBlock}
        {titleBlock}
        {descriptionBlock}
      </div>
    );
  }
}

Title.propTypes = {
  tag: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  className: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center', 'right']),
}

export default Title;