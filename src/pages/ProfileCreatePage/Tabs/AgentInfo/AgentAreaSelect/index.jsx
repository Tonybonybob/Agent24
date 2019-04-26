import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import AreaAutoSuggest from '../../../../../components/common/AreaSelect/AreaAutoSuggest';
import CityAutoSuggest from '../../../../../components/common/AreaSelect/CityAutoSuggest';
import MicrodistrictAutoSuggest from '../../../../../components/common/AreaSelect/MicrodistrictAutoSuggest';
import AdminAreaAutoSuggest from '../../../../../components/common/AreaSelect/AdminAreaAutoSuggest';

class AgentAreaSelect extends Component {
  render() {
    const { operation, cityOrDistrict, adminAreaId } = this.props;

    const showCity = cityOrDistrict && cityOrDistrict === 'CITY';
    const showDistrict = cityOrDistrict && cityOrDistrict === 'DISTRICT';
    const showMicroDistrict = showCity && adminAreaId;

    return (
      <div className="areaSelect">
        <div className="areaSelect__line">
          <div className="areaSelect__field">
            <AreaAutoSuggest />
          </div>
          <div className="areaSelect__field">
            <CityAutoSuggest />
          </div>
          {showCity && (
            <Fragment>
              <div className="areaSelect__field">
                <AdminAreaAutoSuggest showCity />
              </div>
              {showMicroDistrict && (
                <div className="areaSelect__field">
                  <MicrodistrictAutoSuggest />
                </div>
              )}
            </Fragment>
          )}
          {showDistrict && (
            <div className="areaSelect__field">
              <AdminAreaAutoSuggest />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'NewRequredForm',
})(AgentAreaSelect);
