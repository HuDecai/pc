import React from 'react';
import { Carousel } from 'antd';
const styles = require('./style.css');
const carouselImg1 = require('../../assets/images/banner_0.png');
const carouselImg2 = require('../../assets/images/banner_1.png');
const carouselImg3 = require('../../assets/images/banner_3.png');
import Slider from 'react-slick';
// require('slick-carousel/slick/slick-theme.css');
// require('slick-carousel/slick/slick.css');

class Carousels extends React.PureComponent {
  slider = null;
  render() {
    const cWidth = document.body.clientWidth;
    return (
      <div className={styles.carousel} 
      style={{ height: `${ cWidth / 4.467 }`}}
      >
        <div className={styles.carouselBody}>
            <div className={styles.carouselContent}>
              <Slider
                ref={c => this.slider = c }
                autoplay
              >
                <div><img src={carouselImg1} className={styles.imgs} /></div>
                <div><img src={carouselImg2} className={styles.imgs} /></div>
                  <div><img src={carouselImg3} className={styles.imgs} /></div>
              </Slider>
            </div>
            <div className={styles.leftButtons}
              style={{ height: `${ cWidth / 4.467 }`}}
            >
              <div className={styles.leftButton} onClick={() => { this.slider && this.slider.slickPrev() }} />
              <div className={styles.rightButton} onClick={() => { this.slider && this.slider.slickNext() }} />
            </div>
        </div>
      </div>
    );
  }
}

export default Carousels;
