import React from 'react';
import PropTypes from 'prop-types';

import PureSelect from '../../PureSelect';
import { Button } from '../../../general/Button';
import LinkToModal from '../../LinkToModal';
import './style.scss';
const ProfileService = (
  { 
    selectValues, selectValue, handleChange,
    price, title, showMore, paragraph, label,
  },
) => (
  <div className="servicesCard">
    <h4 className="servicesCard__title">
      {title}
    </h4>
    <p className="servicesCard__text">
      {paragraph}
    </p>
    {showMore && (
      <div className="servicesCard__more">
        Подробнее
      </div>
    )}
    <div className="servicesCard__bottom">
      {selectValues && (
        <PureSelect
          items={selectValues}
          value={selectValue}
          onChange={handleChange}
          label={label}
        />
      )}
      <div className="servicesCard__priceWrapper">
        <span className="servicesCard__price">
          {price}
        </span>
        <span className="servicesCard__date">
          /мес.
        </span>
      </div>
      <LinkToModal
        queryParam="payService" 
        state={{
          service: {
            moneyAvailable: '19.10',
            price,
            name: title,
            quantity: label === 'Количество' ? selectValue : null,
          },
        }}
      >
        <Button className="servicesCard__order" full>
          Заказать
        </Button>
      </LinkToModal>
    </div>
  </div>
);

ProfileService.propTypes = {
  selectValues: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.number,
  })),
  selectValue: PropTypes.number,
  handleChange: PropTypes.func,
  price: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
  showMore: PropTypes.bool,
  label: PropTypes.string,
};

ProfileService.defaultProps = {
  selectValues: false,
  selectValue: undefined,
  handleChange: undefined,
  showMore: false,
  label: '',
};

export default ProfileService;
