import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SmallPersonBlock from '../../../SmallPersonBlock';
import AutoComplete from '../../../../common/AutoComplete';
import TrashIcon from '../../../../../assets/Trash';
import PlusIcon from '../../../../../assets/Plus';
import CloseIcon from '../../../../../assets/BigClose';
import { clientBoundLoadAsyncAction } from '../../../../../store/actions/client';
import { getBoundedClient } from '../../../../../store/reducers/client';
import './style.scss';
class BoundedContactsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchPhone: '+380 ',
      showSearchInput: false,
    };

    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handlePhoneSelect = this.handlePhoneSelect.bind(this);
  }

  handlePhoneChange(event, { newValue }) {
    const { loadClient } = this.props;

    if (event.target.tagName !== 'INPUT' || event.key) {
      return false;
    }

    const phoneWithoutSpaces = newValue && newValue.split(' ').join('');
    if (phoneWithoutSpaces.length <= 13) {
      this.setState({ searchPhone: newValue });
    }
    if (phoneWithoutSpaces.length === 13) {
      loadClient({ phone: phoneWithoutSpaces });
    }

    return false;
  }

  handlePhoneSelect(event, { suggestion }) {
    const { searchPhone } = this.state;
    const { addContact, boundedClient } = this.props;

    if (suggestion.value === 'isPerson') {
      addContact({
        img: 'https://randomuser.me/api/portraits/men/52.jpg',
        ...boundedClient,
        name: boundedClient.firstName,
      });
    } else {
      addContact({
        img: 'https://randomuser.me/api/portraits/men/52.jpg',
        phone: searchPhone,
      });
    }
    this.setState({
      showSearchInput: false,
      searchPhone: '+380 ',
    });
  }

  // eslint-disable-next-line class-methods-use-this
  renderAddPerson(isInContacts) {
    return [
      {
        name: (
          <div className="editLineContacts__notFoundSuggestion">
            <span>
              {isInContacts ? 'Такой контакт уже добавлен' : 'Не найдено'}
            </span>
            {!isInContacts && (
              <div className="editLineContacts__notFoundAddButton">
                <PlusIcon />
                <span>
                  Добавить
                </span>
              </div>
            )}
          </div>
        ),
        value: isInContacts ? 'isInContacts' : 'addContact',
      },
    ];
  }

  render() {
    const { searchPhone, showSearchInput } = this.state;
    const { fields, boundedClient } = this.props;

    const allContacts = fields.getAll();
    const isInContacts = boundedClient && allContacts.some(el => el.id === boundedClient.id);
    const phoneWithoutSpaces = searchPhone && searchPhone.split(' ').join('');
    const suggestions = boundedClient && !isInContacts
      ? [
        {
          name: (
            <SmallPersonBlock
              person={{
                img: 'https://randomuser.me/api/portraits/men/52.jpg',
                ...boundedClient,
                name: boundedClient.firstName,
              }}
            />
          ),
          value: 'isPerson',
        },
      ]
      : this.renderAddPerson(isInContacts);

    return (
      <Fragment>
        <div className="editLine editLine_wrap">
          {fields.map((contactField, id) => {
            const contact = fields.get(id);

            return (
              <div key={contact.phone} className="editLineContacts">
                <SmallPersonBlock person={contact} />
                <div className="editLineContacts__icons">
                  <div
                    className="editLineContacts__icon editLineContacts__delete"
                    onClick={() => fields.remove(id)}
                  >
                    <TrashIcon />
                  </div>
                </div>
              </div>
            );
          })}
          <div className="editLineContacts">
            <div className="editLineContacts__icons">
              <div
                className={`editLineContacts__icon editLineContacts__add ${showSearchInput ? '' : 'editLineContacts__add_active'}`}
                onClick={() => this.setState({ showSearchInput: !showSearchInput })}
              >
                <PlusIcon />
              </div>
            </div>
          </div>
          {showSearchInput && (
            <div className="editLineContacts">
              <AutoComplete
                suggestions={phoneWithoutSpaces.length === 13 && suggestions}
                handleSelect={this.handlePhoneSelect}
                handleChange={this.handlePhoneChange}
                value={searchPhone}
                label="Введите номер телефона"
              />
              <div
                className="editLineContacts__removeSearch"
                onClick={() => this.setState({ searchPhone: '+380 ' })}
              >
                <CloseIcon />
              </div>
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

BoundedContactsItem.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.string,
  ),
  loadClient: PropTypes.func.isRequired,
  addContact: PropTypes.func.isRequired,
  boundedClient: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
  }),
};

BoundedContactsItem.defaultProps = {
  fields: [],
  boundedClient: null,
};

const mapStateToProps = state => ({
  boundedClient: getBoundedClient(state),
});

const mapDispatchToProps = dispatch => ({
  loadClient: data => dispatch(clientBoundLoadAsyncAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoundedContactsItem);
