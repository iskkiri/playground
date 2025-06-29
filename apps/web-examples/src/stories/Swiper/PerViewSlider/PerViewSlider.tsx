import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper as ReactSwiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import FeatherIcons from '@repo/icons/featherIcons';
import { sampleList } from '../_data/sampleList';

import './per-view-slider.scss';

export default function PerViewSlider() {
  return (
    <div className="per-view-slider">
      <div className="per-view-slider__container">
        <div className="per-view-slider__navigation">
          <button className="per-view-slider__button per-view-slider-prev">
            <FeatherIcons.ChevronLeft />
          </button>

          <button className="per-view-slider__button per-view-slider-next">
            <FeatherIcons.ChevronRight />
          </button>
        </div>

        <ReactSwiper
          slidesPerView={'auto'}
          spaceBetween={16}
          breakpoints={{
            1280: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          navigation={{
            prevEl: '.per-view-slider-prev',
            nextEl: '.per-view-slider-next',
          }}
          modules={[Navigation]}
        >
          {sampleList.map((img, i) => (
            <SwiperSlide key={i} className="per-view-slider__slide">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt="" className="per-view-slider__image" />
            </SwiperSlide>
          ))}
        </ReactSwiper>
      </div>
    </div>
  );
}
