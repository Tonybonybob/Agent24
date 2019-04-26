import React, { Component, Fragment } from 'react';
import { withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  toCurrencyFormat,
  normalizeDate,
  getAttributeNameById,
} from '../../../../utils';
import CommentsIcon from '../../../../assets/Comments';
import PlaceMarker from '../../../../assets/PlaceMarker';
import CondominiumIcon from '../../../../assets/Condominium';
import ClientSellInfo from '../../../../components/general/ClientTableObjects/ClientFlatSellInfo';
import { getObjects } from '../../../../store/reducers/client';
import { getFlatAttributes } from '../../../../store/reducers/attributes';
import './style.scss';
const defaultPicture =
  'http://api.agent24.pro/fupload/tmp/60b07355c02749bd9b04c883de98238d';

class DatabaseSellCard extends Component {
  constructor(props) {
    super(props);

    this.handleChangeLocation = this.handleChangeLocation.bind(this);
  }

  handleChangeLocation(path) {
    const { history, location, match } = this.props;

    const pathname = match.url === path ? match.path : path;

    history.push({
      pathname,
      search: location.search,
    });
  }

  render() {
    const { objects, flatAttributes, images, match, location } = this.props;
    console.log('clientmobileCards');
    const urlArray = location.pathname.split('/');
    const isNewOrEditRequest = ['new', 'edit'].includes(
      urlArray[urlArray.length - 1]
    );

    return (
      <Fragment>
        <div className="clientCardsList">
          {objects &&
            !isNewOrEditRequest &&
            objects.map((object, index) => (
              <div
                key={index}
                className="cardsList__item"
                data-index={index}
                onClick={() =>
                  this.handleChangeLocation(`${match.url}/${object.id}`)
                }
              >
                <div className="houseFigure">
                  <div className="houseFigure__photoHolder">
                    <img
                      alt=""
                      src={object.mainPhoto || defaultPicture}
                      className="houseFigure__photo"
                    />
                    <div className="houseFigure__photoFooter">
                      <span className="autosearch">
                        <span className="autosearch__item autosearch__item_community">
                          {object.autoSearchCommunity}
                        </span>
                        <span className="autosearch__item autosearch__item_group">
                          {object.autoSearchGroup}
                        </span>
                      </span>
                      <CondominiumIcon />
                    </div>
                  </div>
                  <div className="houseFigure__description description">
                    <div className="description__item description__item_topLine">
                      <span className="description__objectType">Продать</span>
                      <span className="description__gray">Квартиру</span>
                      <span className="description__gray">
                        {normalizeDate(object.createdDate)}
                      </span>
                    </div>
                    <div className="description__item">
                      <strong>
                        <span>
                          {object.room}
                          -к,
                        </span>
                        &nbsp;
                        <span>
                          {object.floor}
                          &nbsp;/&nbsp;
                          {object.maxFloor},
                        </span>
                        &nbsp;
                        <span>
                          {getAttributeNameById(
                            object.schemeId,
                            flatAttributes.scheme
                          )}
                        </span>
                      </strong>
                    </div>
                    <div className="description__item">
                      <span>
                        {object.totalSquare}
                        &nbsp;/&nbsp;
                        {object.livingSquare}
                        &nbsp;/&nbsp;
                        {object.kitchenSquare}
                      </span>
                      , &nbsp;
                      <span>
                        {getAttributeNameById(
                          object.conditionId,
                          flatAttributes.condition
                        )}
                      </span>
                    </div>
                    <div className="description__item description__item_flex description__item_consec description__placeWrapper">
                      <PlaceMarker />
                      <div className="description__place">
                        <div>{object.address.streetName}</div>
                        <div>{object.address.microDistrictName}</div>
                      </div>
                    </div>
                    <div className="description__item description__item_flex">
                      <span className="description__comments">
                        <span>
                          {object.countGroupComments +
                            object.countCommunityComments}
                        </span>
                        <CommentsIcon />
                      </span>
                      <strong>${toCurrencyFormat(object.price)}</strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {!isNewOrEditRequest && (
          <Route
            path={`${match.url}/:id`}
            render={() => <ClientSellInfo images={images} />}
          />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  objects: getObjects(state),
  flatAttributes: getFlatAttributes(state),
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(DatabaseSellCard);
