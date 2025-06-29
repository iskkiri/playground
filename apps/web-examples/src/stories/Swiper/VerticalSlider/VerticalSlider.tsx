import 'swiper/css';
import './vertical-slider.scss';

import { Swiper as ReactSwiper, SwiperSlide } from 'swiper/react';
import { sampleList } from '../_data/sampleList';

export default function VerticalSlider() {
  return (
    <ReactSwiper className="vertical-slider" direction="vertical">
      {sampleList.map((img, i) => (
        <SwiperSlide key={i}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="vertical-slider__image" src={img} alt="" />
        </SwiperSlide>
      ))}
    </ReactSwiper>
  );
}
