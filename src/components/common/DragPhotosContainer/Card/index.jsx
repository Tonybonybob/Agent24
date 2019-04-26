import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import ItemTypes from '../ItemTypes';
import CustomDragLayer from '../CustomDrayLayer';

const cardSource = {
  beginDrag({ id, index }) {
    return {
      id,
      index,
    };
  },
};

const cardTarget = {
  hover(props, monitor, component) {
    if (!component) {
      return null;
    }
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return false;
    }

    // Determine rectangle on screen

    const Element = findDOMNode(component);
    const hoverBoundingRect = Element.getBoundingClientRect();

    // ==============================================================
    // // Get vertical middle
    // const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // // Determine mouse position
    // const clientOffset = monitor.getClientOffset();

    // // Get pixels to the top
    // const XYCoord = clientOffset;
    // const hoverClientY = XYCoord.y - hoverBoundingRect.top;

    // // Only perform the move when the mouse has crossed half of the items height
    // // When dragging downwards, only move when the cursor is below 50%
    // // When dragging upwards, only move when the cursor is above 50%
    // // Dragging downwards
    // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
    //   return false;
    // }

    // // Dragging upwards
    // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
    //   return false;
    // }
    // =======================================================
    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Get horizontal middle
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Get pixels to the left
    const hoverClientX = clientOffset.x - hoverBoundingRect.left;

    const upwards = dragIndex > hoverIndex && hoverClientY > hoverMiddleY;
    const downwards = dragIndex < hoverIndex && hoverClientY < hoverMiddleY;
    const leftwards = dragIndex > hoverIndex && hoverClientX > hoverMiddleX;
    const rightwards = dragIndex < hoverIndex && hoverClientX < hoverMiddleX;

    if (upwards && (leftwards || rightwards)) {
      return;
    }

    if (downwards && (leftwards || rightwards)) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

class Card extends Component {
  componentDidMount() {
    const { connectDragPreview } = this.props;
    if (connectDragPreview) {
      connectDragPreview(getEmptyImage(), {
        captureDraggingState: true,
      });
    }
  }

  render() {
    const {
      photoComponent, elseComponent, placeholderComponent, isDragging,
      connectDragSource, connectDropTarget,
    } = this.props;

    return (
      connectDragSource
      && connectDropTarget
      && connectDragSource(
        connectDropTarget(
          <li>
            {isDragging
              ? (
                <Fragment>
                  {placeholderComponent}
                  {elseComponent}
                  <CustomDragLayer>
                    {photoComponent}
                  </CustomDragLayer>
                </Fragment>
              )
              : (
                <Fragment>
                  {photoComponent}
                  {elseComponent}
                </Fragment>
              )
            }
          </li>,
        ),
      )
    );
  }
}

Card.propTypes = {
  // id: PropTypes.any,
  // text: PropTypes.string,
  // index: PropTypes.number,
  // isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  // moveCard: PropTypes.func,
  photoComponent: PropTypes.element.isRequired,
  elseComponent: PropTypes.element.isRequired,
  placeholderComponent: PropTypes.element.isRequired,
};

export default compose(
  DropTarget(ItemTypes.PHOTO, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  })),
  DragSource(
    ItemTypes.PHOTO,
    cardSource,
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging(),
    }),
  ),
)(Card);
