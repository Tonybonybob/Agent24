import React, { Component } from 'react';

import Select from '../../../../common/Select';
import TextField from '../../../../common/TextField';
import AreaSelect from '../../../../common/AreaSelect';

// eslint-disable-next-line react/prefer-stateless-function
class HouseSell extends Component {
  render() {
    const tempArr = [{ value: 0, name: 'Значение 1' }, { value: 1, name: 'Значение 2' }];
    return (
      <div>
        HouseSell
        <div>
          <Select
            name="street"
            label="Улица или название ЖК"
            items={tempArr}
          />
          <TextField
            label="Дом"
            name="houseNumber"
          />
        </div>
        <div>
          <AreaSelect
            name="address"
            label="Область, город, район"
          />
        </div>
        <div>
          <Select
            name="houseType"
            label="Тип Дома"
            items={tempArr}
          />
          <Select
            name="yearBuild"
            label="Год построя"
            items={tempArr}
          />
          <Select
            name="rooms"
            label="Комнат"
            items={tempArr}
          />
          <TextField
            label="Этаж"
            name="floor"
          />
          <TextField
            label="Этажность"
            name="floorAmount"
          />
        </div>
        <div>
          <Select
            name="condition"
            label="Состояние"
            items={tempArr}
          />
          <Select
            name="wallMaterial"
            label="Материал Стен"
            items={tempArr}
          />
          <TextField
            label="Общая"
            name="overallArea"
          />
          <TextField
            label="Жилая"
            name="livingArea"
          />
          <TextField
            label="Кухня"
            name="kichenArea"
          />
        </div>
        <div>
          <TextField
            label="Описание"
            multiline
            name="description"
            rows={3}
          />
        </div>
        <div>
          <Select
            name="status"
            label="Статус"
            items={tempArr}
          />
          <TextField
            label="Цена"
            name="price"
          />
        </div>
      </div>
    );
  }
}

export default HouseSell;
