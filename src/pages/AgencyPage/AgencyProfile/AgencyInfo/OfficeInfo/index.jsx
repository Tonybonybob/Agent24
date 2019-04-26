import React from 'react';
import PropTypes from 'prop-types';

import Row from '../../../../../components/Grid/Row';
import Col from '../../../../../components/Grid/Col';
import LocationIcon from '../../../../../assets/Location';
import ExternalLinkIcon from '../../../../../assets/ExternalLink';
import EmailIcon from '../../../../../assets/Email';
import './style.scss';

const OfficeInfo = ({ className }) => (
  <Row className={`officeInfo ${className}`}>
    <Col default={{ col: 12 }} lg={{ col: 12 }}>
      <h2 className="officeInfo__title">
        Головной офис
      </h2>
      <Row>
        <Col default={{ col: 12 }} lg={{ col: 4 }}>
          <div className="officeInfo__text">
            <LocationIcon />
            г. Днепр, ул. Московская 2, оф 23
          </div>
        </Col>
        <Col default={{ col: 12 }} lg={{ col: 4 }}>
          <div className="officeInfo__text">
            <ExternalLinkIcon />
            kacheli24.ua
          </div>
          <div className="officeInfo__text">
            <EmailIcon />
            info@kacheli24.ua
          </div>
        </Col>
        <Col default={{ col: 12 }} lg={{ col: 4 }}>
          <div className="officeInfo__text">
            +380 67 123 4567
          </div>
          <div className="officeInfo__text">
            +380 67 123 4567
          </div>
          <div className="officeInfo__text officeInfo__text_gray">
            Валентина
          </div>
        </Col>
      </Row>
    </Col>
  </Row>
);

OfficeInfo.propTypes = {
  className: PropTypes.string,
};

OfficeInfo.defaultProps = {
  className: '',
};

export default OfficeInfo;
