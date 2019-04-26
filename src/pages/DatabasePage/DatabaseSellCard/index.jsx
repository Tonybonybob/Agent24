import React, { Component, Fragment } from 'react';
import { withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  toCurrencyFormat,
  normalizeDate,
  getAttributeNameById,
} from '../../../utils';
import Comments from '../../../assets/Comments';
import PlaceMarker from '../../../assets/PlaceMarker';
import DatabaseSellInfo from '../DatabaseSellTable/DatabaseSellInfo';
import ClientSellInfo from '../../../components/general/ClientTableObjects/ClientFlatSellInfo';
import { getObjects as getDatabaseObjects } from '../../../store/reducers/database';
import { getObjects as getClientObjects } from '../../../store/reducers/client';
import { getFlatAttributes } from '../../../store/reducers/attributes';
import './style.scss';
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
    const {
      dataBaseObjects,
      clientObjects,
      isSliderOpen,
      currentSlideIndex,
      handleChangeSliderIndex,
      flatAttributes,
      images,
      match,
      isClient,
      handleCloseSlider,
      handleOpenSlider,
      location,
    } = this.props;

    const objects = isClient ? clientObjects : dataBaseObjects;
    const urlArray = location.pathname.split('/');
    const isNewOrEditRequest = ['new', 'edit'].includes(
      urlArray[urlArray.length - 1]
    );

    const MobileComponent = isClient ? ClientSellInfo : DatabaseSellInfo;
    return (
      <Fragment>
        <div className="cardsList">
          {objects &&
            !isNewOrEditRequest &&
            objects.map((object, index) => {
              const microdistrictName = object.address.microDistrictName;
              return (
                <div
                  className="cardsList__item"
                  data-index={index}
                  onClick={() =>
                    this.handleChangeLocation(`${match.url}/${object.id}`)
                  }
                >
                  <span className="autosearch">
                    <span className="autosearch__item autosearch__item_community">
                      {object.autoSearchCommunity}
                    </span>
                    <span className="autosearch__item autosearch__item_group">
                      {object.autoSearchGroup}
                    </span>
                  </span>
                  <span className="playVideoLink">
                    <i className="icon playVideo" />
                  </span>
                  <figure className="houseFigure">
                    <img
                      alt=""
                      src={
                        object.mainPhoto ||
                        'http://api.agent24.pro/fupload/tmp/60b07355c02749bd9b04c883de98238d'
                      }
                      className="houseFigure__photo"
                    />
                    <figcaption className="houseFigure__description description">
                      <div className="description__item description__item_flex">
                        <strong>
                          <span>
                            {object.room}
                            -к,
                          </span>
                          &nbsp;
                          <span>
                            {getAttributeNameById(
                              object.schemeId,
                              flatAttributes.scheme
                            )}
                          </span>
                          &nbsp;
                          <span>
                            {object.floor}
                            &nbsp;/&nbsp;
                            {object.maxFloor},
                          </span>
                        </strong>
                        <span className="description__date">
                          {normalizeDate(object.createdDate)}
                        </span>
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
                          <div>{microdistrictName}</div>
                        </div>
                      </div>
                      <div className="description__item description__item_flex description__item_last">
                        <span>
                          {object.sourceInfo && (
                            <span className="description__source">
                              {object.sourceInfo}
                            </span>
                          )}
                          <span className="description__comments">
                            <span className="description__commentsNumber">
                              {object.countGroupComments +
                                object.countCommunityComments}
                            </span>
                            <Comments />
                          </span>
                        </span>
                        <strong>${toCurrencyFormat(object.price)}</strong>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              );
            })}
        </div>
        <Route
          path={`${match.url}/:id`}
          render={() =>
            !isNewOrEditRequest && (
              <MobileComponent
                isSliderOpen={isSliderOpen}
                currentSlideIndex={currentSlideIndex}
                handleChangeSliderIndex={handleChangeSliderIndex}
                handleOpenSlider={handleOpenSlider}
                handleCloseSlider={handleCloseSlider}
                images={images}
              />
            )
          }
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  dataBaseObjects: getDatabaseObjects(state),
  clientObjects: getClientObjects(state),
  flatAttributes: getFlatAttributes(state),
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(DatabaseSellCard);
