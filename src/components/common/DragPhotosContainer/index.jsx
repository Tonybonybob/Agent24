import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Card from './Card';

class Container extends Component {
  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
  }

  moveCard(dragIndex, hoverIndex) {
    const { items, onChange } = this.props;

    const updatedItems = items.map((el, id) => {
      if (id === dragIndex) {
        return items[hoverIndex];
      }
      if (id === hoverIndex) {
        return items[dragIndex];
      }
      return el;
    });

    onChange(updatedItems);
  }

  render() {
    const {
      items, photoComponent: Photo, elseComponent: Else, placeholderComponent: Placeholder,
    } = this.props;
    console.log(items);

    return (
      <Fragment>
        {items.map((item, key) => (
          <Card
            key={item.id}
            index={key}
            id={item.id}
            photoComponent={<Photo {...item} index={key} />}
            elseComponent={<Else {...item} index={key} />}
            placeholderComponent={<Placeholder {...item} index={key} />}
            moveCard={this.moveCard}
          />
        ))}
      </Fragment>
    );
  }
}

Container.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  photoComponent: PropTypes.element,
  elseComponent: PropTypes.element,
  placeholderComponent: PropTypes.element,
};

Container.defaultProps = {
  Component: <div />,
};

export default DragDropContext(HTML5Backend)(Container);
