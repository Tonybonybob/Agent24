import React, { Component } from 'react';

import Select from '../../../../common/Select';
import TextField from '../../../../common/TextField';
import AreaSelect from '../../../../common/AreaSelect';

// eslint-disable-next-line react/prefer-stateless-function
class LandBuy extends Component {
  render() {
    const tempArr = [{ value: 0, name: 'Значение 1' }, { value: 1, name: 'Значение 2' }];
    return (
      <div>
        LandBuy
        <div>
          <Select
            name="name"
            label="Название"
            items={tempArr}
          />
        </div>
        <div>
          <Select
            name="street"
            label="Улица или название ЖК"
            items={tempArr}
          />
          <TextField
            label="№ участка"
            name="landNumber"
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
            name="landName"
            label="Название земли"
            items={tempArr}
          />
          <TextField
            label="Соток"
            name="hundredsPart"
          />
          <TextField
            label="Кадастровый номер"
            name="cadastralNumber"
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

export default LandBuy;
