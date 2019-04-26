import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { setNewRequestFormValuesAction, uploadPhotoAction } from '../../../../store/actions/newRequest';
import Dropzone from '../../../common/Dropzone';
import DragContainer from '../../../common/DragPhotosContainer';
import TextField from '../../../common/TextField';
import IconPlus from '../../../../assets/Plus';
import { getAttributes } from '../../../../store/reducers/attributes';
import { withSizes } from '../../../../utils';
import './style.scss';
class Photos extends Component {
  constructor(props) {
    super(props);
    this.state = { youtubeLinkError: '' };

    this.tags = [
      {
        value: 'fasad',
        name: 'Фасад',
      },
      {
        value: 'smthelse',
        name: 'Другое',
      },
    ];

    this.onDrop = this.onDrop.bind(this);
    this.addVideo = this.addVideo.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { youtubeLinkError } = this.state;
    const { youtubeLink } = this.props;

    if (youtubeLink !== prevProps.youtubeLink && youtubeLinkError) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ youtubeLinkError: '' });
    }
  }

  onDrop(addedPhotos) {
    console.log(addedPhotos);
    const {
      photos, setNewRequestFormValues, uploadPhoto,
      clientId,
    } = this.props;

    const newPhotos = addedPhotos.map((photo, id) => ({
      photoId: photo.preview,
      photoName: photo.name,
      loading: true,
      photoType: '',
      id: photos.length + id,
    }));
    uploadPhoto({ photos: addedPhotos, id: clientId });

    setNewRequestFormValues({ photos: [...photos, ...newPhotos] });
  }

  onChangeSelect(e, id) {
    const { photos, setNewRequestFormValues } = this.props;

    setNewRequestFormValues({
      photos: photos.map(photo => (
        photo.id === id ? { ...photo, photoType: e.target.value } : photo)),
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getYoutubeIdByUrl(url) {
    let ID = '';
    const newUrl = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (newUrl[2] !== undefined) {
      // eslint-disable-next-line no-useless-escape
      ID = newUrl[2].split(/[^0-9a-z_\-]/i);
      // eslint-disable-next-line prefer-destructuring
      ID = ID[0];
    } else {
      ID = newUrl;
    }

    return `https://img.youtube.com/vi/${ID}/0.jpg`;
  }

  addVideo() {
    const { youtubeLink, setNewRequestFormValues, videos } = this.props;

    if (!youtubeLink || this.getYoutubeIdByUrl(youtubeLink) === `https://img.youtube.com/vi/${youtubeLink}/0.jpg`) {
      this.setState({ youtubeLinkError: 'Неверный URL' });
      return false;
    }

    const alreadyVideo = videos.some(url => (
      this.getYoutubeIdByUrl(youtubeLink) === this.getYoutubeIdByUrl(url)
    ));

    if (!alreadyVideo) {
      setNewRequestFormValues({
        videos: [...videos, youtubeLink],
        youtubeLink: '',
      });
    } else {
      // setNewRequestFormValues({ youtubeLink: '' });
      this.setState({ youtubeLinkError: 'Такое видео уже добавлено' });
    }
    return false;
  }

  deleteVideo(url) {
    const { videos, setNewRequestFormValues } = this.props;

    setNewRequestFormValues({
      videos: videos.filter(el => el !== url),
    });
  }

  deletePhoto(id) {
    const { photos, setNewRequestFormValues } = this.props;

    setNewRequestFormValues({
      photos: photos.filter(el => el.id !== id),
    });
  }

  renderSelect(photoType, id) {
    const { attributes } = this.props;

    return (
      <FormControl classes={{ root: 'select__container' }}>
        <Select
          name="tag"
          classes={{ root: 'select__underline' }}
          value={photoType}
          displayEmpty
          onChange={e => this.onChangeSelect(e, id)}
        >
          <MenuItem value="" disabled>
            тег
          </MenuItem>
          {(attributes.photoTypes || []).slice(1, attributes.photoTypes.length).map(item => (
            <MenuItem
              value={item.id}
              key={item.id}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  render() {
    const { youtubeLinkError } = this.state;
    const {
      photos, setNewRequestFormValues, videos, isDesktop,
    } = this.props;

    return (
      <div className="newRequestPhotos">
        {!isDesktop && (
          <div className="newRequestPhotos__tabletDropzone">
            <Dropzone
              onDrop={this.onDrop}
              accept="image/jpeg, image/png"
              className="newRequestDropzone"
            >
              <IconPlus fill="#0097A7" />
              <span>
                Добавить фото
              </span>
            </Dropzone>
          </div>
        )}
        <ul className="newRequestPhotos__list">
          <DragContainer
            items={photos}
            onChange={photoList => setNewRequestFormValues({ photos: photoList })}
            photoComponent={photo => (
              <div className="newRequestPhotoItem newRequestPhotoItem_realPhoto">
                <div className="newRequestPhotoItem__photoHolder">
                  <div
                    className="newRequestPhotoItem__photo"
                    style={{ backgroundImage: `url(${photo.photoId})` }}
                  />
                  {photo.loading && (
                    <div className="newRequestPhotoItem__loader">
                      Loading ...
                    </div>
                  )}
                </div>
              </div>
            )}
            elseComponent={({ photoType, id, index }) => (
              <Fragment>
                <div className="newRequestPhotoItem__tag">
                  {index === 0 ? 'Основная фотография' : this.renderSelect(photoType, id)}
                </div>

                <div className="photoHead">
                  <i className="photoHead__close" onClick={() => this.deletePhoto(id)} />
                </div>
              </Fragment>
            )}
            placeholderComponent={() => (
              <div className="newRequestPhotoItem">
                <div className="newRequestPhotoItem__photoHolder newRequestPhotoItem__photoHolder_empty" />
              </div>
            )}
          />
          {isDesktop && (
            <li className="newRequestPhotoItem">
              <div>
                <Dropzone
                  onDrop={this.onDrop}
                  accept="image/jpeg, image/png"
                  className="newRequestDropzone"
                />
              </div>
            </li>
          )}
        </ul>
        <ul className="newRequestPhotos__videoList youtubeList">
          {videos.length > 0 && videos.map(url => (
            <li
              className="youtubeList__video"
              key={url}
            >
              <div
                className="youtubeList__videoInner"
                style={{ backgroundImage: `url(${this.getYoutubeIdByUrl(url)})` }}
              />
              <div className="photoHead">
                <i className="photoHead__close" onClick={() => this.deleteVideo(url)} />
              </div>
            </li>
          ))}
        </ul>
        <div className="newRequestPhotos__youtubeLink">
          <TextField
            placeholder="Ссылка на видео YouTube"
            name="youtubeLink"
            required={false}
            error={!!youtubeLinkError}
            helperText={youtubeLinkError}
          />
          <div className="newRequestPhotos__addVideo" onClick={this.addVideo} />
        </div>
      </div>
    );
  }
}

Photos.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.string,
  ),
  videos: PropTypes.arrayOf(
    PropTypes.string,
  ),
  setNewRequestFormValues: PropTypes.func.isRequired,
  youtubeLink: PropTypes.string,
  clientId: PropTypes.number.isRequired,
  uploadPhoto: PropTypes.func.isRequired,
};

Photos.defaultProps = {
  photos: [],
  videos: [],
  youtubeLink: '',
};

const selector = formValueSelector('NewRequestForm');

const mapStateToProps = state => ({
  photos: selector(state, 'photos'),
  youtubeLink: selector(state, 'youtubeLink'),
  videos: selector(state, 'videos'),
  attributes: getAttributes(state),
});

const mapDispatchToProps = dispatch => ({
  setNewRequestFormValues: data => dispatch(setNewRequestFormValuesAction(data)),
  uploadPhoto: data => dispatch(uploadPhotoAction(data)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSizes,
)(Photos);
