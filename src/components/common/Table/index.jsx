import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
// eslint-disable-next-line
class MyTable extends Component {
  static propTypes = {
    tableHead: PropTypes.shape({
      content: PropTypes.node,
    }).isRequired,
    tableContent: PropTypes.array,
    onRowClick: PropTypes.func,
    equalSpaces: PropTypes.bool,
    database: PropTypes.bool,
  }

  static defaultProps = {
    onRowClick: () => { },
    equalSpaces: false,
    database: false,
  }

  render() {
    const {
      tableHead, tableContent, activeId, database,
    } = this.props;

    return (
      <table className="table">
        <thead>
          <tr>
            {tableHead.map(({ content, ...other }, id) => (
              <Fragment>
                <th {...other} className={`table__cell table__cell_header ${database ? 'table__cell_database' : ''}`}>
                  {content}
                </th>
              </Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableContent.map((contentRow, rowIndex) => contentRow && (
            <Fragment>
              <tr className={`table__row ${(contentRow[1].objectChosen || contentRow[1].id === activeId) ? 'table__row_active' : ''}`} data-index={rowIndex} onClick={contentRow[1].handleClick}>
                {contentRow[0].map(({ content, ...other }, id) => (
                  <Fragment>
                    <td
                      {...other}
                      className={`table__cell ${tableContent.length === rowIndex + 1 ? 'table__cell_noUnderline' : ''}`}
                    >
                      {content}
                    </td>
                  </Fragment>
                ))}
              </tr>
              {contentRow[1].contentClick && (
                <tr className="table__row">
                  <td colSpan="25">
                    {contentRow[1].contentClick}
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    );
  }
}

MyTable.propTypes = {
  activeId: PropTypes.number,
};

MyTable.defaultProps = {
  activeId: null,
};

export default MyTable;
