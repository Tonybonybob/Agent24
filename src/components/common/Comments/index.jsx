import React, { Fragment, Component } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import { normalizeDate } from '../../../utils';
import DefaultAvatar from '../../../assets/DefaultAvatar';
import TextFieldPlane from '../TextFieldPlane';
import { addCommentAsyncAction, removeCommentAsyncAction, changeCommentAsyncAction } from '../../../store/actions/database';
import { getUserId } from '../../../store/reducers/user';

class Comments extends Component {
  constructor(props) {
    super(props);

    this.scrollbarRef = React.createRef();

    this.state = {
      options: null,
    };

    this.handleMessageSend = this.handleMessageSend.bind(this);
    this.handleMessageDelete = this.handleMessageDelete.bind(this);
    this.handleMessageEdit = this.handleMessageEdit.bind(this);
    this.handleRemoveEditing = this.handleRemoveEditing.bind(this);
    this.handlePossibleSend = this.handlePossibleSend.bind(this);
  }


  componentDidMount() {
    if (this.scrollbarRef.current) {
      this.scrollbarRef.current.scrollToBottom();
    }
  }

  componentDidUpdate(prevProps) {
    const { comments } = this.props;

    if (prevProps.comments.length !== comments.length && this.scrollbarRef.current) {
      this.scrollbarRef.current.scrollToBottom();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleRemoveEditing);
  }

  handlePossibleSend(event) {
    if (event.key === 'Enter') {
      this.handleMessageSend();
    }
  }

  handleMessageSend() {
    const { global, addComment, editComment, isClient, setCommentValue } = this.props;

    const { id, index } = this.state;


    if (id) {
      editComment({
        id,
        isGlobal: global,
        index,
        isClient,
      });
      this.handleRemoveEditing();
    } else {
      addComment({
        isGlobal: global,
        isClient,
      });
    }


    if (global) {
      setCommentValue({ communityComment: '' });
    } else {
      setCommentValue({ comment: '' });
    }
  }

  handleRemoveEditing(event) {
    const { global, setCommentValue } = this.props;

    console.log(event);

    if (!event || event.key === 'Escape') {
      if (global) {
        setCommentValue({ communityComment: '' });
      } else {
        setCommentValue({ comment: '' });
      }
      document.removeEventListener('keydown', this.handleRemoveEditing);

      this.setState({ id: null, index: null });
    }
  }

  handleMessageEdit(event) {
    const { global, setCommentValue } = this.props;

    const id = Number(event.currentTarget.getAttribute('data-id'));
    const index = Number(event.currentTarget.getAttribute('data-index'));
    const text = event.currentTarget.getAttribute('data-text');

    document.addEventListener('keydown', this.handleRemoveEditing);

    if (global) {
      setCommentValue({ communityComment: text });
    } else {
      setCommentValue({ comment: text });
    }

    this.setState({
      options: null,
      index,
      id
    });
  }

  handleMessageDelete(event) {
    const { isClient, removeComment, global } = this.props;

    const id = Number(event.currentTarget.getAttribute('data-id'));
    const index = Number(event.currentTarget.getAttribute('data-index'));

    removeComment({
      id,
      isClient,
      isGlobal: global,
      index,
    });

    this.setState({ options: null });
    this.handleRemoveEditing();
  }

  renderComments() {
    const { comments, userId } = this.props;

    const { options, id } = this.state;

    return comments && (
      comments.map((comment, index) => (
        <div className="comments__item">
          {comment.userId !== userId ? (
            <Fragment>
              {comment.photoId
                ? <img className="comments__photo comments__photo_right" alt="comment author" src={comment.photoId} />
                : (
                  <span className="comments__photo comments__photo_right">
                    <img height="40" width="40" src="https://randomuser.me/api/portraits/men/52.jpg" />
                  </span>
                )}
              <div className="comments__textBlock">
                <div className="comments__author">
                  {comment.userName}
                </div>
                <div className="comments__text">
                  {comment.text}
                  <div className="comments__datePlaceholder" />
                  <span className="comments__date">
                    {normalizeDate(comment.createdDate)}
                  </span>
                </div>
              </div>
            </Fragment>
          ) : (
              <Fragment>
                <div className={`comments__textBlock comments__textBlock_author ${id === comment.id ? 'comments__textBlock_highlight' : ''}`}>
                  {comment.isEditable && (
                    <div className="comments__breadcrumbs" onClick={() => this.setState({ options: index })}>
                      <div className="comments__breadcrumbs_inner" />
                    </div>
                  )}
                  {options === index && (
                    <ClickAwayListener onClickAway={() => this.setState({ options: null })}>
                      <div className="comments__action commentAction" style={{ top: (options === comments.length - 1 && options !== 0) ? '-50px' : 0 }}>
                        <div className="commentAction__item" data-id={comment.id} data-index={index} data-text={comment.text} onClick={this.handleMessageEdit}>
                          Редактировать
                      </div>
                        <div className="commentAction__item" data-id={comment.id} data-index={index} onClick={this.handleMessageDelete}>
                          Удалить
                      </div>
                      </div>
                    </ClickAwayListener>
                  )}
                  <div className="comments__text">
                    {comment.text}
                    <div className="comments__datePlaceholder" />
                    <span className="comments__date">
                      {normalizeDate(comment.createdDate)}
                    </span>
                  </div>
                </div>
                {comment.photoId
                  ? <img className="comments__photo comments__photo_left" alt="comment author" src={comment.photoId} />
                  : (
                    <span className="comments__photo comments__photo_left">
                      <img height="40" width="40" src="https://randomuser.me/api/portraits/men/52.jpg" />
                    </span>
                  )}
              </Fragment>
            )}
        </div>
      ))
    );
  }

  render() {
    const { fieldName, comments } = this.props;

    return (
      <Fragment>
        {comments && comments.length > 0 && (
          <div className="comments__holder">
            <Scrollbars ref={this.scrollbarRef}>
              <div className="comments">
                {this.renderComments()}
              </div>
            </Scrollbars>
          </div>
        )}
        <TextFieldPlane
          handleClick={this.handleMessageSend}
          onKeyPress={this.handlePossibleSend}
          placeholder="Комментарий"
          name={fieldName}
          className="objectInfoMessages__input"
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  userId: getUserId(state),
});

const mapDispatchToProps = dispatch => ({
  addComment: data => dispatch(addCommentAsyncAction(data)),
  removeComment: data => dispatch(removeCommentAsyncAction(data)),
  editComment: data => dispatch(changeCommentAsyncAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
