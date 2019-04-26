import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from '../../../../common/Select';
import { getAttributes } from '../../../../../store/reducers/attributes';
import { getFormData } from '../../../../../store/reducers/newRequest';

// eslint-disable-next-line react/prefer-stateless-function
class FlatSell extends Component {
  render() {
    const { attributes, technicalFloorVisible } = this.props;
    const builtYear = [
      { id: 1, name: '1й квартрал 2018' },
      { id: 2, name: '2й квартрал 2018' },
      { id: 3, name: '3й квартрал 2018' },
      { id: 4, name: '4й квартрал 2018' },
      { id: 5, name: '1й квартрал 2019' },
      { id: 6, name: '2й квартрал 2019' },
      { id: 7, name: '3й квартрал 2019' },
      { id: 8, name: '4й квартрал 2019' },
    ];
    const defaultValues = [{ id: true, name: 'Да' }, { id: false, name: 'Нет' }];
    return (
      <div className="newRequestAdditional">
        <div className="newRequestAdditional__line">
          <div className="newRequestAdditional__field">
            <Select
              name="heatingId"
              label="Отопление"
              items={attributes.heating || []}
            />
          </div>
          <div className="newRequestAdditional__field">
            <Select
              name="bathroomsId"
              label="Санузлы"
              items={attributes.bathrooms || []}
            />
          </div>
          <div className="newRequestAdditional__field">
            <Select
              name="planId"
              label="Планировка"
              items={attributes.plan || []}
            />
          </div>
          <div className="newRequestAdditional__field">
            <Select
              name="viewIds"
              label="Вид"
              items={attributes.view || []}
              multiple
            />
          </div>
        </div>
        <div className="newRequestAdditional__line">
          <div className="newRequestAdditional__field">
            <Select
              name="equipmentIds"
              label="Комплектация"
              items={/*attributes.equipmen ||*/ []}
              multiple
            />
          </div>
          <div className="newRequestAdditional__field">
            <Select
              name="overlappingId"
              label="Перекрытия"
              items={attributes.overlapping || []}
            />
          </div>
          <div className="newRequestAdditional__field">
            <Select
              name="isCorner"
              label="Угловая"
              items={defaultValues}
            />
          </div>
          <div className="newRequestAdditional__field">
            <Select
              name="roofId"
              label="Крыша"
              items={attributes.roof || []}
            />
          </div>
        </div>
        <div className="newRequestAdditional__line">
          { technicalFloorVisible && (
            <div className="newRequestAdditional__field">
              <Select
                name="isTechnicalFloor"
                label="Техэтаж"
                items={defaultValues}
              />
            </div>) }
          <div className="newRequestAdditional__field">
            <Select
              name="isGas"
              label="Газ"
              items={defaultValues}
            />
          </div>
          <div className="newRequestAdditional__field">
            <Select
              name="ceilingHeightId"
              label="Потолок"
              items={attributes.ceilingHeight || []}
            />
          </div>
          <div className="newRequestAdditional__field">
            <Select
              name="parkingIds"
              label="Паркинг"
              items={attributes.parking || []}
              multiple
            />
          </div>
        </div>
        <div className="newRequestAdditional__line">
          <div className="newRequestAdditional__field">
            <Select
              name="recreationIds"
              label="Рекреация"
              items={attributes.recreation || []}
              multiple
            />
          </div>
          <div className="newRequestAdditional__field">
            <Select
              name="builtYear"
              label="Год постройки дома"
              items={builtYear}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  attributes: getAttributes(state),
  technicalFloorVisible: (getFormData(state).floor === getFormData(state).maxFloor
    && getFormData(state).maxFloor > 0),
});

export default connect(mapStateToProps)(FlatSell);
