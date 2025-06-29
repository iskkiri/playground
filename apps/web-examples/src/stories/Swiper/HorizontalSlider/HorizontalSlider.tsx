import 'swiper/css';
import 'swiper/css/pagination';
import './horizontal-slider.scss';

import { Swiper as ReactSwiper, SwiperSlide } from 'swiper/react';
import { sampleList } from '../_data/sampleList';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';

export default function HorizontalSlider() {
  return (
    <div className="horizontal-slider">
      <ReactSwiper
        pagination={{
          el: '.horizontal-slider__pagination',
          type: 'fraction',
        }}
        modules={[Pagination]}
      >
        {sampleList.map((img, i) => (
          <SwiperSlide key={i}>
            <Image
              src={img}
              alt=""
              width={1000}
              height={1000}
              className="horizontal-slider__image"
            />
          </SwiperSlide>
        ))}
      </ReactSwiper>

      <div className="horizontal-slider__pagination" />
    </div>
  );
}
