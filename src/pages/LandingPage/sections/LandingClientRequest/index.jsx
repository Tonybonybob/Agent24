import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import HeaderUnauthorised from '../../../../components/common/HeaderUnauthorised';
import Title from '../../../../components/common/Title';
import LandingClientRequestFeatures from './Features';
import { withSizes } from '../../../../utils/sizes';
import ArrowDownLanding from '../../../../assets/ArrowDownLanding';
import './style.scss';
class LandingClientRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFeature: 0,
      headerHide: true,
      iPhoneHide: true,
      sliderHide: true,
      isScrolled: false,
    };

    this.setActiveCurrentFeature = this.setActiveCurrentFeature.bind(this);

    this.scrollbarsRef = React.createRef();
  }

  componentDidMount() {
    setTimeout(() =>
      this.setState({
        headerHide: false,
      })
    );
    setTimeout(
      () =>
        this.setState({
          iPhoneHide: false,
        }),
      1000
    );
    setTimeout(
      () =>
        this.setState({
          sliderHide: false,
        }),
      2000
    );
  }

  setActiveCurrentFeature(number, callback) {
    this.scrollbarsRef.current && this.scrollbarsRef.current.scrollToTop();

    this.setState(
      {
        currentFeature: number,
      },
      callback
    );

    setTimeout(() => this.setState({ isScrolled: false }), 200);
  }

  features = [
    {
      id: 0,
      title: 'Добавьте покупателя в систему',
      description: `
      Система сразу покажет его фото, определит доступные месенджеры по всем его номерам, покажет кто еще с ним работает, как давно, что смотрел, у кого в черном списке, а также его рейтинг среди риэлторов`,
      className: 'landingClientRequest__stageCharacter_database',
      link: require('../../../../assets/DBofObjects.png'),
      previewLink: require('../../../../assets/DBofObjects_preview.png'),
    },
    {
      id: 1,
      title: 'Добавьте параметры поиска на покупку',
      description: `Расставьте булавки по карте вашего города вокруг которых система подберет самые подходящие обьекты по более чем 10 параметрам,  система будет учитывать предпочтение по этажам, типам проектов, цене обьекта и состоянию. Ни одна система еще не смогла с такой ювелирной точностью сделать лучшую подборку обьектов для покупателя как это делает Агент24`,
      className: 'landingClientRequest__stageCharacter_addObject',
      link: '../../../assets/AddObject.png',
      previewLink: '../../../assets/AddObject_preview.png',
    },
    {
      id: 2,
      title: 'Нажмите Автопоиск',
      description: `И отправьте самую крутую подборку обьектов прямо в Вайбер вашему покупателю одним кликом или свайпом пальца!
Агент24 подберет все базовые и риэлторские обьекты всех Агентств и частников в любом городе за 1 секунду. Никогда еще подбор обьектов не приносил такого удовольствия как  Агент24`,
      className: 'landingClientRequest__stageCharacter_autosearch',
      link: '../../../assets/AutoSearch.png',
      previewLink: '../../../assets/AutoSearch_preview.png',
    },
  ];

  // handleScrollbarScroll = (percentage) => {
  //   const { autoScrollAvailable } = this.state;

  //   if (autoScrollAvailable) {
  //     this.setState({
  //       isAutoScroll: true,
  //     });
  //     if (this.scrollbarsRef.current) {
  //       this.scrollbarsRef.current.scrollTop((this.scrollbarsRef.current.getScrollHeight() - this.scrollbarsRef.current.getClientHeight()) * percentage / 100);
  //     }
  //     this.setState({
  //       isAutoScroll: false,
  //     });
  //     setTimeout(() => this.setState({ isAutoScroll: true }), 100);
  //   }
  // }

  // handleStopAutoscroll = (value) => {
  //   console.log('changed');
  //   this.setState(prevState => ({
  //     isAutoScroll: !prevState.isAutoScroll,
  //     autoScrollAvailable: prevState.isAutoScroll,
  //   }));
  // }

  render() {
    const {
      currentFeature,
      headerHide,
      iPhoneHide,
      sliderHide,
      isScrolled,
    } = this.state;

    const { setActiveImage, isDesktop } = this.props;

    return (
      <div className="landingClientRequest landingPage__block">
        <div
          className={`landingClientRequest__header ${
            headerHide ? 'landingClientRequest__header_hide' : ''
          }`}
        >
          <HeaderUnauthorised />
        </div>
        <div className="container landingClientRequest__content">
          <div
            className={`row landingClientRequest__titleWrapper ${
              headerHide ? 'landingClientRequest__titleWrapper_hide' : ''
            }`}
          >
            <Title
              tag="СКОРО В УКРАИНЕ"
              title="От звонка покупателя до задатка всего 3 простых шага"
              className="row__col row__col_sm10 row__col_mlsm1 row__col_md8 row__col_mlmd2 row__col_lg6 row__col_mllg3"
            />
          </div>
          <div className="row landingClientRequest__content_inner">
            <div
              className={`
              row__col row__col_12 row__col_md4 row__col_mllg1 row__col_ordermd1
              landingClientRequest__stageContainer
              ${iPhoneHide ? 'landingClientRequest__stageContainer_hide' : ''}
            `}
            >
              {isDesktop ? (
                <div className="landingClientRequest__stage">
                  <div className="landingClientRequest__stageBackground">
                    {!isScrolled && (
                      <ArrowDownLanding
                        className="landingClientRequest__stageContainerShowScroll"
                        onClick={() =>
                          this.scrollbarsRef.current &&
                          this.scrollbarsRef.current.scrollTop(5)
                        }
                      />
                    )}
                    <div className="landingClientRequest__stageCharacter">
                      <Scrollbars
                        style={{ height: 479, width: 238 }}
                        ref={this.scrollbarsRef}
                        onScroll={() => this.setState({ isScrolled: true })}
                        autoHide={false}
                        renderTrackHorizontal={props => (
                          <div
                            {...props}
                            className="track-horizontal"
                            style={{ display: 'none' }}
                          />
                        )}
                        renderThumbHorizontal={props => (
                          <div
                            {...props}
                            className="thumb-horizontal"
                            style={{ display: 'none' }}
                          />
                        )}
                      >
                        <img
                          src={this.features[currentFeature].link}
                          alt=""
                          className="landingClientRequest__stagePhoto"
                        />
                      </Scrollbars>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    backgroundImage: `url(${
                      this.features[currentFeature].previewLink
                    })`,
                  }}
                  className="landingClientRequest__smallPhoto"
                  onClick={() =>
                    setActiveImage(this.features[currentFeature].link)
                  }
                >
                  &nbsp;
                </div>
              )}
            </div>
            <div
              className={`
                row__col row__col_12 row__col_md6 row__col_mlmd1 landingClientRequest__featuresWrapper
                ${
                  sliderHide ? 'landingClientRequest__featuresWrapper_hide' : ''
                }
              `}
            >
              <LandingClientRequestFeatures
                features={this.features}
                active={currentFeature}
                setActive={this.setActiveCurrentFeature}
                className="landingClientRequest__features"
                onProgressBarChange={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withSizes(LandingClientRequest);
