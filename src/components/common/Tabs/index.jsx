import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './style.scss';
const MyTabs = ({ activeTab, color, change, navLinks, fullWidth }) => {
  return (
    <div className="tabs">
      <Tabs
        value={activeTab}
        onChange={change}
        indicatorColor={color}
        fullWidth={fullWidth}
        textColor={color}
        scrollable
        scrollButtons="auto"
        classes={{
          root: 'tabs__container',
          scrollButtons: 'tabs__scrollButtons',
        }}
      >
        {navLinks.map(el => (
          <Tab
            label={el.label}
            key={el.value}
            disableTouchRipple
            classes={{
              root: 'tabs__item',
              selected: 'tabs__item_selected',
              labelContainer: 'tabs__labelWrapper',
              label: 'tabs__label',
            }}
          />
        ))}
      </Tabs>
    </div>
  );
};

MyTabs.propTypes = {
  activeTab: PropTypes.number,
  color: PropTypes.string,
  change: PropTypes.func,
  navLinks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  fullWidth: PropTypes.bool,
};

MyTabs.defaultProps = {
  activeTab: 0,
  color: 'primary',
  change: () => {},
  fullWidth: true,
};

export default MyTabs;
