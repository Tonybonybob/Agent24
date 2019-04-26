import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Calendar from '../../common/Calendar';
import NewTaskForm from './TaskForm';
import LinkToModal from '../../common/LinkToModal';
import OpenedTask from '../OpenedCalendarTask';
import IconPlus from '../../../assets/Plus';
import IconFullScreen from '../../../assets/FullScreen';
import { calendarTasksLoadAsyncAction } from '../../../store/actions/calendar';
import { getCalendarTasks } from '../../../store/reducers/calendar';
import './style.scss';
// eslint-disable-next-line
class AsideCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: moment(),
      showCalendar: false,
      showForm: false,
      sliderMonth: 'current',
      activeTask: null,
    };

    this.setThreeMonth(moment());

    this.datesWheel = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.showForm = this.showForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.setDateBySlider = this.setDateBySlider.bind(this);
    this.showCalendar = this.showCalendar.bind(this);
    this.setThreeMonth = this.setThreeMonth.bind(this);
  }

  componentDidMount() {
    this.getTasksForSelectedDate();
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedDate } = this.state;

    if (!selectedDate.isSame(prevState.selectedDate, 'day')) {
      this.getTasksForSelectedDate();
    }
  }

  getTasksForSelectedDate() {
    const { selectedDate } = this.state;
    const { loadTasks } = this.props;

    const today = selectedDate.clone().startOf('day');
    const tomorrow = selectedDate.clone().add(1, 'day').startOf('day');
    loadTasks(today.unix(), tomorrow.unix());
  }

  setThreeMonth(date) {
    const prevMonth = date.clone().subtract(1, 'months');
    const nextMonth = date.clone().add(1, 'months');

    this.threeMonths = [
      {
        order: 'previous',
        month: prevMonth.format('MMMM'),
        value: prevMonth,
      },
      {
        order: 'current',
        month: date.format('MMMM'),
        value: date,
      },
      {
        order: 'next',
        month: nextMonth.format('MMMM'),
        value: nextMonth,
      },
    ];
    if (this.datesWheel && this.datesWheel.current) {
      const dayTo = prevMonth.daysInMonth() + parseInt(date.format('D'), 10) - 1; // because index
      this.datesWheel.current.slickGoTo(dayTo);
    }
  }

  setDateBySlider(index) {
    const getMoment = (order, value) => {
      const year = value.format('YYYY');
      const month = value.format('MM');
      let day = index + 1;
      if (order === 'current') {
        day -= this.threeMonths[0].value.daysInMonth();
      } else if (order === 'next') {
        day = day
          - this.threeMonths[0].value.daysInMonth()
          - this.threeMonths[1].value.daysInMonth();
      }
      return moment(`${day}-${month}-${year}`, 'DD-MM-YYYY');
    };

    const prev = this.threeMonths[0].value;
    const curr = this.threeMonths[1].value;
    const next = this.threeMonths[2].value;
    let date = moment();
    let newMonthOrder = 'current';
    if (index < prev.daysInMonth()) {
      date = getMoment('previous', prev);
      newMonthOrder = 'previous';
    } else if (index < prev.daysInMonth() + curr.daysInMonth()) {
      date = getMoment('current', curr);
    } else if (index < prev.daysInMonth() + curr.daysInMonth() + next.daysInMonth()) {
      date = getMoment('next', next);
      newMonthOrder = 'next';
    }

    this.setState({
      selectedDate: date,
      sliderMonth: newMonthOrder,
      activeTask: null,
    });
  }

  showForm() {
    this.setState({
      showForm: true,
      showCalendar: false,
    });
  }

  closeForm() {
    this.setState({
      showForm: false,
      showCalendar: false,
    });
  }

  changeTask(id) {
    const { activeTask } = this.state;
    if ((!id && id !== 0) || id === activeTask) {
      this.setState({ activeTask: null });
    } else {
      this.setState({ activeTask: id });
    }
  }

  handleChange(date) {
    this.setState({
      selectedDate: date,
      showCalendar: false,
      sliderMonth: 'current',
      activeTask: null,
    });
    this.setThreeMonth(date);
  }

  showCalendar() {
    const { showCalendar } = this.state;

    if (!showCalendar) {
      this.setState({
        showCalendar: true,
        showForm: false,
      });
    }
  }

  renderTasks() {
    const { activeTask, selectedDate } = this.state;
    const { tasks } = this.props;

    const filteredTasks = tasks.filter((task) => {
      if (moment(task.executionDateTime, 'YYYY-MM-DD HH:mm').isSame(selectedDate, 'day')) {
        return true;
      }
      return false;
    });

    return filteredTasks.map((task) => {
      if (activeTask === task.id) {
        return (
          <OpenedTask
            task={task}
            onClick={() => this.changeTask()}
          />
        );
      }
      const time = moment(task.executionDateTime, 'YYYY-MM-DD HH:mm').format('HH:mm');
      return (
        <div
          className="calendar-task"
          key={task.id}
          onClick={() => this.changeTask(task.id)}
          style={{ borderColor: task.color }}
        >
          <div className="calendar-task__time">
            {time}
          </div>
          <div className="calendar-task__info">
            <h6>
              {task.title}
            </h6>
            <p>
              {task.description}
            </p>
          </div>
        </div>
      );
    });
  }

  renderWheel() {
    const { showCalendar, sliderMonth, selectedDate, showForm } = this.state;

    const previousMonth = this.threeMonths[0].value;
    const initialDay = previousMonth.daysInMonth() + parseInt(selectedDate.format('D'), 10) - 1; // because index

    const month = this.threeMonths.find(el => el.order === sliderMonth)
      ? this.threeMonths.find(el => el.order === sliderMonth).month
      : this.threeMonths[1].month;
    return (
      <div className="aside-calendar__wheelHolder">
        {!showCalendar && (
          <div className="aside-calendar__month">
            <span onClick={this.showCalendar} className="aside-calendar__monthName">
              {month}
            </span>
          </div>
        )}
        {showCalendar && !showForm && (
          <Calendar
            inline
            selected={selectedDate}
            onChange={this.handleChange}
            className=""
          />
        )}
        <Slider
          ref={this.datesWheel}
          afterChange={this.setDateBySlider}
          dots={false}
          arrows={false}
          infinite={false}
          speed={500}
          focusOnSelect
          centerMode
          initialSlide={initialDay}
          swipeToSlide
          swipe
          slidesToShow={3}
          className="aside-calendar__wheel"
        >
          {this.threeMonths.map(monthItem => this.renderMonth(monthItem.order))}
        </Slider>
      </div>
    );
  }

  renderMonth(order) {
    const amountOfDays = this.threeMonths.find(el => el.order === order).value.daysInMonth();
    const dates = new Array(amountOfDays).fill(null);

    return dates.map((el, key) => (
      <div
        // eslint-disable-next-line react/no-array-index-key
        key={key}
        className="wheel-item"
      >
        <span>
          {key + 1}
        </span>
      </div>
    ));
  }

  render() {
    const { selectedDate, showForm } = this.state;

    const isToday = selectedDate.isSame(moment(), 'day');

    return (
      <div className="aside-calendar">
        <div className="aside-calendar__header">
          <span className="aside-calendar__title">
            Календарь
          </span>
          <span onClick={this.showForm} className="aside-calendar__plus">
            <IconPlus />
          </span>
          <span className="aside-calendar__full">
            <LinkToModal
              queryParam="calendar"
            >
              <IconFullScreen />
            </LinkToModal>
          </span>
        </div>

        {showForm && (
          <NewTaskForm
            setNewDate={this.setThreeMonth}
            closeForm={this.closeForm}
          />
        )}

        {this.renderWheel()}

        <div>
          {this.renderTasks().length === 0
            ? (
              <p className="aside-calendar__tasksPlaceholder">
                Нет заданий на
                {isToday ? ' сегодня' : ' этот день'}
              </p>
            )
            : this.renderTasks()
          }
        </div>
        <div>
          <div onClick={this.showForm} className="calendar-task empty">
            <div className="calendar-task__time">
              8:00
            </div>
          </div>

          <div onClick={this.showForm} className="calendar-task empty">
            <div className="calendar-task__time">
              9:00
            </div>
          </div>

          <div className="calendar-task customColorBorder" style={{ borderColor: '#56CCF2' }}>
            <div className="calendar-task__time">
              10:00
            </div>
            <div className="calendar-task__info">
              <div className="title">
                Просмотр
              </div>
              <div className="descr">
                пр. Гагарина 161
              </div>
            </div>
          </div>

          <div className="calendar-task">
            <div className="calendar-task__time">
              11:00
            </div>
            <div className="calendar-task__info">
              <div className="title">
                Показ
              </div>
              <div className="descr">
                пр. Гагарина 113
              </div>
            </div>
          </div>

          <div className="calendar-task customColorBorder" style={{ borderColor: '#F2C94C' }}>
            <div className="calendar-task__time">
              12:00
            </div>
            <div className="calendar-task__info">
              <div className="title">
                Просмотр
              </div>
              <div className="descr">
                пр. Ленина 1
              </div>
            </div>
          </div>

          <div className="calendar-task open">
            <i className="iconClose"></i>
            <div className="calendar-task__time">
              13:00
            </div>

            <div className="calendar-task__info">

              <div className="title">
                Показ
              </div>

              <div className="descr">
                Победы-1 мкр, <br/>
                пр. Гагарина 161, кв. 5
              </div>

              <div className="foldingBlock">

                <div className="seller profileBlock withDescr">
                  <div className="profileBlock__photo">
                    <img src="http://fakeimg.pl/240x240/00CED1/FFF/?text=viktor+seller" />
                  </div>

                  <div className="profileBlock__infoBlock">
                    <div className="profileBlock__infoBlock_status">
                      Продавец
                    </div>
                    <span class="profileBlock__infoBlock_name">
                      Виктор
                    </span>
                    <span class="profileBlock__infoBlock_tel">
                      +380 63 123 4567
                    </span>
                  </div>

                  <div className="profileBlock__descr">
                    2 комнатная, хрущёвка, 3 / 9, 
                    40 / 25 / 12, $ 27 000
                  </div>
                </div>

                <div className="customer profileBlock">
                  <div className="profileBlock__photo">
                    <img src="http://fakeimg.pl/240x240/FF0073/FFF/?text=Anna+customer" />
                  </div>

                  <div className="profileBlock__infoBlock">
                    <div className="profileBlock__infoBlock_status">
                      покупатель
                    </div>
                    <span class="profileBlock__infoBlock_name">
                      Анна
                    </span>
                    <span class="profileBlock__infoBlock_tel">
                      +380 63 123 4567
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          <div onClick={this.showForm} className="calendar-task empty">
            <div className="calendar-task__time">
              14:00
            </div>
          </div>

          <div onClick={this.showForm} className="calendar-task empty">
            <div className="calendar-task__time">
              15:00
            </div>
          </div>

          <div onClick={this.showForm} className="calendar-task empty">
            <div className="calendar-task__time">
              16:00
            </div>
          </div>

          <div onClick={this.showForm} className="calendar-task empty">
            <div className="calendar-task__time">
              17:00
            </div>
          </div>

          <div onClick={this.showForm} className="calendar-task empty">
            <div className="calendar-task__time">
              18:00
            </div>
          </div>

          <div onClick={this.showForm} className="calendar-task empty">
            <div className="calendar-task__time">
              19:00
            </div>
          </div>

          <div onClick={this.showForm} className="calendar-task empty">
            <div className="calendar-task__time">
              20:00
            </div>
          </div>

        </div>
      </div>
    );
  }
}

AsideCalendar.propTypes = {
  loadTasks: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    }),
  ),
};

AsideCalendar.defaultProps = {
  tasks: [],
};

const mapStateToProps = state => ({
  tasks: getCalendarTasks(state),
});

const mapDispatchToProps = dispatch => ({
  loadTasks: (dateFrom, dateTo) => dispatch(calendarTasksLoadAsyncAction(dateFrom, dateTo)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AsideCalendar));
