import React, { Component, Fragment } from 'react';
import SwipeableViews from 'react-swipeable-views';

import Title from '../../../../components/common/Title';
import LandingFeature from '../../LandingFeature';
import LandingClientRequestFeature from '../LandingClientRequest/Features/Feature';
import { withSizes } from '../../../../utils/sizes';
import DotNav from '../../../../components/common/DotNav';
import InfoRounded from '../../../../assets/InfoRounded';
import PlusRounded from '../../../../assets/PlusRounded';
import MinusRounded from '../../../../assets/MinusRounded';
import TriangleLeft from '../../../../assets/TriangleLeft';
import './style.scss';
class LandingPresentation extends Component {
  features = [{
    id: 0,
    title: 'Добавьте Обьект на продажу',
    description: `Узнайте кто еще его продает, с кем еще сотрудничает ваш клиент, как давно, сколько раз был показан и какая динамика по цене за весь период`,
    svg: <PlusRounded />,
    descriptionPhotoLink: '/public/assets/AddObjectSell.png',
    previewPhotoLink: '/public/assets/AddObjectSell_mobile_preview.png',
    fullPhotoLink: '/public/assets/AddObjectSell_mobile.png',
  }, {
    id: 1,
    title: 'Добавьте Характеристики Объекта',
    description: `
      Занесите основную информацию о Вашем обьекте по всей территории Украины.
Введите всего улицу и номер дома а система сама поставит город, админрайон, микрорайон, материал стен и этажность дома, а если это новострой Агент24 сам поставит название ЖК и заполнит необходимые поля`,
    svg: <InfoRounded />,
    descriptionPhotoLink: '/public/assets/ObjectCharacteristics.png',
    previewPhotoLink: '/public/assets/ObjectCharacteristics_mobile_preview.png',
    fullPhotoLink: '/public/assets/ObjectCharacteristics_mobile.png',
  }, {
    id: 2,
    title: 'Нажмите автопоиск',
    description: `Агент24 подберет вам реальных покупателей из всех агентств недвижимости Украины за 1 секунду, оповестит других риэлторов о том что найден новый обьект для их покупателей, сделает рассылку покупателям Вашего обьекта в 1 клик`,
    svg: <MinusRounded />,
    descriptionPhotoLink: '/public/assets/AutoSearchSell.png',
    previewPhotoLink: '/public/assets/AutoSearchSell_preview.png',
    fullPhotoLink: '/public/assets/AutoSearchSell.png',
  }];

  state = {
    active: 0,
    reallyActive: 0,
  }

  handleChangeIntervalPresentation = () => {
    this.setState(prevState => ({
      active: (prevState.active + 1) % 3,
    }));
  }

  handleDotClick = (index) => {
    this.setState({
      active: index,
    });
  }

  handleMoveRight = () => {
    this.setState(prevState => ({
      active: (prevState.active + 1) % 3,
    }));
  }

  handleMoveLeft = () => {
    this.setState(prevState => ({
      active: (prevState.active + 2) % 3,
    }));
  }

  render() {
    const { isDesktop, setActiveImage, isDesktopLarge, isDesktopExtraExtraLarge } = this.props;

    const { active, reallyActive } = this.state;

    console.log((document.querySelector('.landingPresentation__photo_active') || {}).offsetHeight);

    return (
      <div className="landingPresentation landingPage__block">
        <div style={{ display: 'none' }}>
          {this.features.map(feature => (
            <Fragment>
              <img src={feature.descriptionPhotoLink} alt="1" />
              <img src={feature.previewPhotoLink} alt="1" />
              <img src={feature.fullPhotoLink} alt="1" />
            </Fragment>
          ))}
        </div>
        <img
          src="/public/assets/ArrowLeft.png"
          alt=""
          className="landingPresentation__triangle"
          onClick={this.handleMoveLeft}
        />
        <img
          src="/public/assets/ArrowRight.png"
          alt=""
          className="landingPresentation__triangle landingPresentation__triangle_right"
          onClick={this.handleMoveRight}
        />
        <div className="container">
          {!isDesktop && (
            <h3 className="landingPresentation__title">
              Создавайте по 20 показов в день на Ваш обьект не расходуя ни копейки на рекламу
            </h3>
          )}
          <div className="row">
            <div
              className="row__col row__col_10 row__col_ml1 row__col_mllg0 row__col_lg3 row__col_orderlg1 landingPresentation__sidebar"
            // style={{
            //   height: (document.querySelector('.landingPresentation__photo_active') || {}).offsetHeight + 96 + 'px',
            // }}
            >
              {isDesktop
                ? (
                  this.features.map((feature, index) => (
                    <img
                      src={isDesktop ? feature.descriptionPhotoLink : feature.previewPhotoLink}
                      alt=""
                      onLoad={() => this.setState({ reallyActive: active })}
                      className={`
                        landingPresentation__photo 
                        ${index === active ? 'landingPresentation__photo_active' : ''}
                        ${`landingPresentation__photo_${index}`}
                      `}
                    />
                  ))
                ) : (
                  <img
                    src={isDesktop ? this.features[active].descriptionPhotoLink : this.features[active].previewPhotoLink}
                    alt=""
                    onLoad={() => this.setState({ reallyActive: active })}
                    className={`landingPresentation__photo landingPresentation__photo_${reallyActive}`}
                    onClick={isDesktop ? undefined : () => setActiveImage(this.features[active].fullPhotoLink)}
                  />
                )}
            </div>
            <div className="row__col row__col_10 row__col_ml1 row__col_lg4 row__col_mllg1 row__col_mrlg4 landingPresentation__content">
              {isDesktop && (
                <h3 className="landingPresentation__title">
                  Создавайте по 20 показов в день на Ваш обьект не расходуя ни копейки на рекламу
                </h3>
              )}
              <SwipeableViews index={active} onChangeIndex={this.handleDotClick}>
                {this.features.map((feature, index) => (
                  <div
                    className={`
                      landingClientRequestFeatures__item
                      ${index === 0 ? 'landingClientRequestFeatures__item_first' : ''}
                    `}
                    style={{
                      transition: index === 0 && 'margin-left 0.5s ease-in-out',
                      marginLeft: index === 0 && `-${active * 100}%`,
                    }}
                    key={feature.id}
                  >
                    {feature.svg}
                    <LandingFeature
                      title={feature.title}
                      description={feature.description}
                      className="landingPresentation__item"
                      highlightColor="cream"
                    />
                  </div>
                ))}
              </SwipeableViews>
              <DotNav
                total={this.features.length}
                current={active + 1}
                handleChange={this.handleDotClick}
              />
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default withSizes(LandingPresentation);
