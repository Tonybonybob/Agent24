import React from 'react';
import AvatarImageCropper from 'react-avatar-image-cropper';

// import Dropzone from '../../../common/Dropzone';
import CloseIcon from '../../../../assets/BigClose';
import ArrowUp from '../../../../assets/ArrowUp';
import './style.scss';
const CroppableDropBox = ({ onDrop, photo, deletePhoto }) => (
  <div className="cropDropBox">
    <div className="cropDropBox__photo">
      {photo
        ? <div className="cropDropBox__photoInner" style={{ backgroundImage: `url(${photo})` }} />
        : (
          <AvatarImageCropper
            className="cropDropBox__cropper"
            apply={onDrop}
            text=" "
            icon={(
              <div className="cropDropBox__cropperInner">
                <div className="cropDropBox__cropperInnerButton">
                  <ArrowUp />
                  <span>
                    Загрузить фото
                  </span>
                </div>
              </div>
            )}
            cancelBtnStyle={{
              background: '#FFF',
              width: '66px',
              height: '32px',
              borderRadius: '2px',
              border: '1px solid rgba(0, 151, 167, .48)',
              color: '#0097A7',
            }}
            applyBtnStyle={{
              background: '#0097A7',
              width: '66px',
              height: '32px',
              borderRadius: '2px',
              border: '1px solid #0097A7',
              color: '#FFF',
            }}
          />
        )
      }
      {photo && (
        <div className="cropDropBox__photoDelete" onClick={deletePhoto}>
          <CloseIcon />
        </div>
      )}
    </div>
  </div>
);

export default CroppableDropBox;
