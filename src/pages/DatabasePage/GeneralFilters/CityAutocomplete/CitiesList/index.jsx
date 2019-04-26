import React, { Component } from 'react';

export default class CitiesList extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showMore: false,
    };
    
    this.handleToggleShowMore = this.handleToggleShowMore.bind(this);
  }
  
  handleToggleShowMore() {
    this.setState(prevState => ({
      showMore: !prevState.showMore,
    }));
  }
  
  render() {
    const { cities, label, chooseCity, cityId } = this.props;
    
    const { showMore } = this.state;
    
    return (
      cities.length > 0 && (
        <div>
          <div className="citySuggest__header">
            <span className="citySuggest__name">
              {label}
            </span>
            {cities.length > 5 && (
              <span className="citySuggest__showAll" onClick={this.handleToggleShowMore}>
                {showMore
                  ? 'Скрыть'
                  : 'Показать всё'
                }
              </span>
            )}
          </div>
          <div>
            {(showMore ? cities : cities.slice(0, 5)).map(city => (
              <div
                className={`citySuggest__suggest ${cityId === city.id ? 'citySuggest__suggest_highlight' : ''}`}
                onClick={chooseCity}
                data-id={city.id}
                key={city.id}
              >
                {city.name}
              </div>
            ))}
          </div>
        </div>
      )
    );
  }
}