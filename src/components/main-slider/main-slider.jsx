import React, {useState} from 'react';
import Dots from '../dots/dots';
import {Slides} from '../../const';
import Slide1 from '../slide-1/slide-1';
import Slide2 from '../slide-2/slide-2';
import Slide3 from '../slide-3/slide-3';

const MainSlider = () => {
  const [isActive, setActive] = useState(`1`);

  const SlideContent = () => {
    switch (isActive) {
      case Slides.SLIDE1:
        return (
          <Slide1/>
        );
      case Slides.SLIDE2:
        return (
          <Slide2/>
        );
      case Slides.SLIDE3:
        return (
          <Slide3/>
        );
    }
    return ``;
  };

  return (
    <section className="page-main__slider slider">
      <SlideContent />
      <Dots isActive={isActive} setActive={setActive} />
    </section>
  );
};

export default MainSlider;
