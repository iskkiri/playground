import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiper-with-custom-class.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import FeatherIcons from '@repo/icons/featherIcons';

export default function SwiperWithCustomClass() {
  return (
    <div className="swiper-custom">
      <div className="swiper-custom__controls">
        <button className="swiper-custom__button swiper-button-prev-custom">
          <FeatherIcons.ChevronLeft color="#666" size={20} />
        </button>

        <div className="swiper-custom__pagination swiper-pagination-custom" />

        <button className="swiper-custom__button swiper-button-next-custom">
          <FeatherIcons.ChevronRight color="#666" size={20} />
        </button>
      </div>

      <Swiper
        navigation={{
          prevEl: '.swiper-button-prev-custom',
          nextEl: '.swiper-button-next-custom',
        }}
        pagination={{
          el: '.swiper-pagination-custom',
          type: 'fraction',
        }}
        modules={[Navigation, Pagination]}
        className="swiper-custom__container"
      >
        {[...Array(5)].map((_, i) => (
          <SwiperSlide key={i} className="swiper-custom__slide">
            Slide {i + 1}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
