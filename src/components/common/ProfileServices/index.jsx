import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProfileService from './ProfileService';
import { getStates } from '../../../store/reducers/attributes';
import './style.scss';
class ProfileServices extends Component {
  static propTypes = {
    states: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })),
  }

  static defaultProps = {
    states: [],
  }

  constructor(props) {
    super(props);

    this.state = {
      topNumber: 100,
      chatbotNumber: 100,
      messagesNumber: 100,
    };
  }

  render() {
    const { states } = this.props;

    const { state, topNumber, chatbotNumber, messagesNumber } = this.state;

    return (
      <div className="profileServices">
        <h3 className="profileServices__title">
          Покупка сервисов
        </h3>
        <div className="profileServices__cards agentProfile__block">
          <ProfileService
            title="Парсер база области"
            paragraph="база обьектов от собственников продажа/аренда по всей выбранной области"
            selectValues={states}
            selectValue={state || states[0] ? states[0].id : ''}
            onChange={event => this.setState({ state: event.target.value })}
            label="Область"
            price="199₴"
          />
          <ProfileService
            title="ТОП публикации"
            paragraph="Приоритетные показы Вашего обьекта в общей базе на продажу"
            showMore
            selectValues={[
              { value: 10, name: 10 },
              { value: 25, name: 25 },
              { value: 50, name: 50 },
              { value: 75, name: 75 },
              { value: 100, name: 100 },
            ]}
            selectValue={topNumber}
            onChange={event => this.setState({ topNumber: event.target.value })}
            label="Количество"
            price="199₴"
          />
          <ProfileService
            title="Чатбот"
            paragraph="Первый кросс-платформенный мессенджер. Обьединяйте мессенджеры с нашим сервисом и позвольте боту делать работу за Вас. Получайте бесплатно сервис «Мой портал» и ваши клиенты смогут искать обьекты в Вашей базе"
            showMore
            label="Количество"
            price="199₴"
          />
          <ProfileService
            title="Чатбот рассылка"
            paragraph="Приоритетные показы Вашего обьекта в общей базе на продажу"
            selectValues={[
              { value: 10, name: 10 },
              { value: 25, name: 25 },
              { value: 50, name: 50 },
              { value: 75, name: 75 },
              { value: 100, name: 100 },
            ]}
            showMore
            selectValue={chatbotNumber}
            onChange={event => this.setState({ chatbotNumber: event.target.value })}
            label="Количество"
            price="199₴"
          />
          <ProfileService
            title="СМС-рассылка"
            paragraph="Если у Вашего клиента нет Вайбера, Вотсапа или Телеграма, отправляйте ссылки на Ваши обьекты 
            через СМС в один клик"
            selectValues={[
              { value: 10, name: 10 },
              { value: 25, name: 25 },
              { value: 50, name: 50 },
              { value: 75, name: 75 },
              { value: 100, name: 100 },
            ]}
            selectValue={messagesNumber}
            onChange={event => this.setState({ messagesNumber: event.target.value })}
            label="Количество"
            price="199₴"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  states: getStates(state),
});

export default connect(mapStateToProps)(ProfileServices);
