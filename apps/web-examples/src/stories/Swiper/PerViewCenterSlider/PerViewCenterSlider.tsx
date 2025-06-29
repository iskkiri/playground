import 'swiper/css';
import 'swiper/css/navigation';
import './per-view-center-slider.scss';

import { Swiper as ReactSwiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { sampleList2 } from '../_data/sampleList';
import FeatherIcons from '@repo/icons/featherIcons';

// slidePerView와 loop를 같이 사용할 경우 주의할 점
// => total slide >= slidePerView x 2
// => 전체 슬라이드의 수는 slidePerView 설정 값의 2배 이상이어야 함
// => ex) 리스트(전체 슬라이드)의 개수가 5개인데, slidePerView가 3일 경우 이슈 발생
// => [...list,...list] 와 같이 2배로 늘리는 방식으로 해결 가능
export default function PerViewCenterSlider() {
  return (
    <div className="per-view-center-slider">
      <ReactSwiper
        slidesPerView={'auto'} // 'auto'로 설정 시 slide의 너비가 고정되어야 함, number로 입력 시에는 slide의 너비를 자동으로 계산
        spaceBetween={40}
        centeredSlides
        loop
        autoplay
        navigation={{
          prevEl: '.per-view-center-slider__button--prev',
          nextEl: '.per-view-center-slider__button--next',
        }}
        modules={[Autoplay, Navigation]}
      >
        {[...sampleList2, ...sampleList2].map((image, i) => (
          <SwiperSlide key={i}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt="" className="per-view-center-slider__image" />
          </SwiperSlide>
        ))}
      </ReactSwiper>

      {/* Slide Navigations */}
      <div className="per-view-center-slider__navigation">
        <button className="per-view-center-slider__button--prev">
          <FeatherIcons.ChevronLeft />
        </button>

        <button className="per-view-center-slider__button--next">
          <FeatherIcons.ChevronRight />
        </button>
      </div>
    </div>
  );
}
