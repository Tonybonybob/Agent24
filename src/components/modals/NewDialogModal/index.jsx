import React, { Component, Fragment } from 'react';
import { reduxForm } from 'redux-form';

import SearchBar from '../../common/SearchBar';
import TextField from '../../common/TextField';
import { Button } from '../../general/Button';
import CloseIcon from '../../../assets/Close';
import './style.scss';
class NewDialogModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      humans: [],
    };

    this.types = [
      {
        label: 'Мое АН',
        peopleType: 'private',
      },
      {
        label: 'Агенты',
        peopleType: 'agent',
      },
      {
        label: 'Клиенты',
        peopleType: 'clients',
      },
    ];
  }

  handleHumanChange(human) {
    const { humans } = this.state;
    const foundHuman = humans.find(el => el.phone === human.phone);
    if (foundHuman) {
      this.setState({
        humans: humans.filter(el => el.phone !== human.phone),
      });
    } else {
      this.setState({
        humans: [...humans, human],
      });
    }
  }

  renderHumans(humans, selected) {
    return humans.map(human => (
      <li
        className={`newDialogHuman ${selected ? 'newDialogHuman-selected' : ''}`}
        key={human.phone}
        onClick={() => this.handleHumanChange(human)}
      >
        <img src={human.photo} alt="" className="newDialogHuman__photo" />
        <div className="newDialogHuman__content">
          <h6 className="newDialogHuman__name">
            {human.name}
          </h6>
          <div className="newDialogHuman__phone">
            {human.phone}
          </div>
        </div>
        {selected && <CloseIcon />}
      </li>
    ));
  }

  renderPeople(filter) {
    const { humans: stateHumans } = this.state;
    const people = [
      {
        name: 'Виктор Николаевич',
        phone: '+380 50 123 4567',
        photo: 'https://randomuser.me/api/portraits/men/78.jpg',
        isClient: true,
        agency: null,
      },
      {
        name: 'Виктория Игоревич',
        phone: '+380 66 867 4656',
        photo: 'https://randomuser.me/api/portraits/men/78.jpg',
        isClient: false,
        agency: 'agent',
      },
      {
        name: 'Марина Иванова',
        phone: '+380 78 222 5646',
        photo: 'https://randomuser.me/api/portraits/men/78.jpg',
        isClient: false,
        agency: 'private',
      },
    ];
    let humans = [];
    let selected = false;
    for (const man of people) {
      const isInState = stateHumans.find(el => el.phone === man.phone);
      if (!isInState) {
        humans.push(man);
      }
    }
    switch (filter) {
      case 'private':
        humans = humans.filter(el => el.agency === 'private');
        break;
      case 'agent':
        humans = humans.filter(el => el.agency === 'agent');
        break;
      case 'clients':
        humans = humans.filter(el => el.isClient);
        break;
      default:
        selected = true;
        humans = stateHumans;
        break;
    }
    return this.renderHumans(humans, selected);
  }

  render() {
    const { humans } = this.state;
    const { closeModal } = this.props;

    return (
      <div className="newDialogModal">
        <div
          className="newDialogModal__closeButton"
          onClick={closeModal}
        >
          <CloseIcon />
        </div>
        <ul className="newDialogModal__people">
          {this.renderPeople()}
        </ul>
        <SearchBar
          name="searchPeople"
          placeholder="Добавить еще пользователей"
        />
        {humans.length > 1 && (
        <TextField
          name="newGroupName"
          label="Название группы"
          className="newDialogModal__groupName"
        />
        )}
        <ul className="newDialogModal__people">
          {this.types.map(type => !!this.renderPeople(type.peopleType).length && (
          <Fragment key={type.peopleType}>
            <li className="newDialogModal__label">
              {type.label}
            </li>
            {this.renderPeople(type.peopleType)}
          </Fragment>
          ))}
        </ul>
        <Button disabled className="newDialogModal__startButton">
					Начать беседу

        </Button>
      </div>
    );
  }
}

export default reduxForm({
  form: 'NewDialogForm',
})(NewDialogModal);
