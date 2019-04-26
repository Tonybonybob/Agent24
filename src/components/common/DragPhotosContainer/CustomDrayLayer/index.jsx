import React from 'react';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';

import ItemTypes from '../ItemTypes';
// import BoxDragPreview from '../DragPreview';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

function getItemStyles(props) {
  const { initialOffset, currentOffset } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }

  const { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

class CustomDragLayer extends React.Component {
  renderItem() {
    const { itemType, children } = this.props;
    switch (itemType) {
      case ItemTypes.PHOTO:
        return children;
      default:
        return false;
    }
  }

  render() {
    const { isDragging } = this.props;
    if (!isDragging) {
      return null;
    }

    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          {this.renderItem()}
        </div>
      </div>
    );
  }
}

CustomDragLayer.propTypes = {
  children: PropTypes.node.isRequired,
  item: PropTypes.object,
  itemType: PropTypes.string,
  currentOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  isDragging: PropTypes.bool.isRequired,
};

CustomDragLayer.defaultProps = {
  itemType: '',
};

export default DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
}))(CustomDragLayer);
