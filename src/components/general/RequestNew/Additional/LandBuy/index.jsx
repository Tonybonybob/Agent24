import React, { Component } from 'react';

import Select from '../../../../common/Select';

// eslint-disable-next-line react/prefer-stateless-function
class LandBuy extends Component {
  render() {
    const tempArr = [{ value: 0, name: 'Значение 1' }, { value: 1, name: 'Значение 2' }];
    return (
      <div>
        LandBuy
        <div>
          <Select
            name="heating"
            label="Отопление"
            items={tempArr}
          />
          <Select
            name="bathrooms"
            label="Санузлы"
            items={tempArr}
          />
          <Select
            name="layout"
            label="Планировка"
            items={tempArr}
          />
          <Select
            name="view"
            label="Вид"
            items={tempArr}
          />
        </div>
        <div>
          <Select
            name="complectation"
            label="Комплектация"
            items={tempArr}
          />
          <Select
            name="overlapping"
            label="Перекрытия"
            items={tempArr}
          />
          <Select
            name="isOnCorner"
            label="Угловая"
            items={tempArr}
          />
          <Select
            name="roof"
            label="Крыша"
            items={tempArr}
          />
        </div>
        <div>
          <Select
            name="techFloor"
            label="Техэтаж"
            items={tempArr}
          />
          <Select
            name="gas"
            label="Газ"
            items={tempArr}
          />
          <Select
            name="ceiling"
            label="Потолок"
            items={tempArr}
          />
          <Select
            name="parkingLot"
            label="Паркинг"
            items={tempArr}
          />
        </div>
        <div>
          <Select
            name="street"
            label="Рекреация"
            items={tempArr}
          />
        </div>
      </div>
    );
  }
}

export default LandBuy;
