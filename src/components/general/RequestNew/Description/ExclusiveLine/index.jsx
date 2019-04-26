import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import moment from 'moment';
import { createNumberMask } from 'redux-form-input-masks';

import Tooltip from '../../../../common/Tooltip';
import Dropzone from '../../../../common/Dropzone';
import TextField from '../../../../common/TextField';
import PureTextField from '../../../../common/PureTextField';
import Calendar from '../../../../common/Calendar';
import FileIcon from '../../../../../assets/File';
import { setNewRequestFormValuesAction } from '../../../../../store/actions/newRequest';
import './style.scss';
const percentMask = createNumberMask({ suffix: ' %', allowEmpty: true, decimalPlaces: 1 });

const acceptedPhotoTypes = ['jpeg', 'jpg', 'png'];
const acceptedFileTypes = ['pdf', 'doc', 'docx'];

class ExclusiveLine extends Component {
  constructor(props) {
    super(props);

    this.handleCalendarFromChange = this.handleCalendarFromChange.bind(this);
    this.handleCalendarToChange = this.handleCalendarToChange.bind(this);
    this.handleOnDrop = this.handleOnDrop.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
  }

  handleCalendarFromChange(date) {
    const { setNewRequestValues } = this.props;

    setNewRequestValues({
      exclusiveDateFrom: date.format('YYYY-MM-DD HH:mm'),
    });
  }

  handleCalendarToChange(date) {
    const { setNewRequestValues } = this.props;

    setNewRequestValues({
      exclusiveDateTo: date.format('YYYY-MM-DD HH:mm'),
    });
  }

  handleOnDrop(droppedfiles) {
    const { setNewRequestValues, files } = this.props;

    const acceptedArray = droppedfiles.reduce((arr, acc) => {
      const name = acc.name.split('.');
      const ext = name[name.length - 1];
      if (acceptedPhotoTypes.includes(ext)) {
        return [...arr, { ...acc, photoId: acc.preview }]; // set photo object
        // eslint-disable-next-line no-else-return
      } else if (acceptedFileTypes.includes(ext)) {
        return [...arr, { ...acc, isFile: true }]; // set file object
      }
      return arr;
    }, []);

    setNewRequestValues({
      exclusivePhotos: [
        ...files,
        ...acceptedArray,
      ],
    });
  }

  deleteFile(filePreview) {
    const { files, setNewRequestValues } = this.props;

    setNewRequestValues({
      exclusivePhotos: files.filter(el => el.preview !== filePreview),
    });
  }

  renderFiles() {
    const { files } = this.props;

    return files.map(file => (
      <div className="exclusivePhoto">
        <div className="exclusivePhoto__holder">
          {file.isFile
            ? (
              <div className="exclusivePhoto__svgHolder">
                <FileIcon />
              </div>
            )
            : <div className="exclusivePhoto__inner" style={{ backgroundImage: `url(${file.photoId})` }} />
          }
        </div>
        <div className="exclusivePhoto__head">
          <i className="exclusivePhoto__close" onClick={() => this.deleteFile(file.preview)} />
        </div>
      </div>
    ));
  }

  render() {
    const { dateFrom, dateTo } = this.props;

    return (
      <div className="newRequestDesc__line exclusiveLine">
        <div className="newRequestDesc__field exclusiveLine__formFields">
          <div className="exclusiveLine__field exclusiveLine__field_comission">
            <Tooltip text="Укажите % комиссионного вознаграждения" primary />
            <TextField name="exclusiveCommision" label="Комиссия, %" {...percentMask} />
          </div>
          <div className="exclusiveLine__field exclusiveLine__field_dates">
            <Calendar
              selected={moment(dateFrom, 'YYYY-MM-DD HH:mm')}
              onChange={this.handleCalendarFromChange}
              dateFormat="ll"
              customInput={(
                <PureTextField
                  label="Начало действия договора"
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
            <Calendar
              selected={moment(dateTo, 'YYYY-MM-DD HH:mm')}
              onChange={this.handleCalendarToChange}
              dateFormat="ll"
              customInput={(
                <PureTextField
                  label="Конец действия договора"
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </div>
        </div>
        <div>
          <Tooltip
            primary
            text="Прикрепленный экземпляр договора после регистрации будет удален в архив и доступен только для Вас, никто из администраторов,
              модераторов или риэлторов Агент24 не сможет его просмотреть или скачать согласно п4.3 пользовательского соглашения"
          />
        </div>
        <div className="exclusiveLine__photoItem">
          <Dropzone onDrop={this.handleOnDrop} />
        </div>
        {this.renderFiles()}
      </div>
    );
  }
}

ExclusiveLine.propTypes = ({
  dateFrom: PropTypes.string.isRequired,
  dateTo: PropTypes.string.isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
    }),
  ),
  setNewRequestValues: PropTypes.func.isRequired,
  exclusiveOwner: PropTypes.string,
});

ExclusiveLine.defaultProps = {
  files: [],
  exclusiveOwner: '',
};

const selector = formValueSelector('NewRequestForm');

const mapStateToProps = state => ({
  dateFrom: selector(state, 'exclusiveDateFrom'),
  dateTo: selector(state, 'exclusiveDateTo'),
  exclusiveOwner: selector(state, 'exclusiveOwner'),
  files: selector(state, 'exclusivePhotos'),
});

const mapDispatchToProps = dispatch => ({
  setNewRequestValues: values => dispatch(setNewRequestFormValuesAction(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExclusiveLine);
