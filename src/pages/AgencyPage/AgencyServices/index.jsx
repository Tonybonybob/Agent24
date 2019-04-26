import React, { Component } from 'react';

import ProfileServices from '../../../components/common/ProfileServices';
import SearchBar from '../../../components/common/SearchBar';
import Row from '../../../components/Grid/Row';
import Col from '../../../components/Grid/Col';
import ServicesTable from './ServicesTable';
import './style.scss';
class AgencyServices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
    };
    this.handleEmployeeSearch = this.handleEmployeeSearch.bind(this);
  }

  handleEmployeeSearch(e) {
    this.setState({ searchValue: e.target.value });
  }

  render() {
    const { searchValue } = this.state;

    return (
      <div className="agencyServices">
        <Row>
          <Col default={{ col: 12 }} lg={{ col: 3 }}>
            <SearchBar
              withReduxForm={false}
              value={searchValue}
              placeholder="Все сотрудники"
              onChange={this.handleEmployeeSearch}
              white
            />
          </Col>
        </Row>
        {/* <ServicesTable /> */}
        <ProfileServices />
      </div>
    );
  }
}

export default AgencyServices;
