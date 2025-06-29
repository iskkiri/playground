import 'swiper/css';
import './per-view-slider-example.scss';

import { useMemo } from 'react';
import { Swiper as ReactSwiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';
import { sampleList3 } from '../_data/sampleList';
import clsx from 'clsx';
import useSlide from '@/_hooks/useSlide';

// 슬라이드 아이템의 너비가 일정하지 않을 경우 slidePerView를 'auto'로 설정해야 함
// number로 설정 시 너비 / number의 등간격으로 슬라이드가 넘어가기 때문
// ex) 1200px / 3 = 400px => 하나의 슬라이드를 400px로 간주하고 400px씩 이동

export interface SampleImageListItem {
  imageUrl1: string;
  imageUrl2: string;
}

export default function PerViewSliderExample() {
  const { activeIndex, onSlideChange } = useSlide();

  const slideImageList = useMemo(() => {
    return sampleList3.reduce((acc, image, i) => {
      // 3번째 이미지는 처리 X
      if (i % 4 === 2) return acc;

      // 1번째, 4번째 이미지는 1장
      if (i % 4 === 0 || i % 4 === 3) {
        return [...acc, { imageUrl1: image, imageUrl2: '' }];
      }

      // 2번째 이미지와 3번째 이미지를 묶어서 처리
      return [...acc, { imageUrl1: image, imageUrl2: sampleList3[i + 1] ?? '' }];
    }, [] as SampleImageListItem[]);
  }, []);

  const slidePaginationCount = useMemo(() => {
    if (slideImageList.length - 2 <= 0) return 0;

    return slideImageList.length - 2;
  }, [slideImageList.length]);

  return (
    <div className="per-view-slider__container">
      <ReactSwiper
        slidesPerView={'auto'}
        spaceBetween={24}
        onSlideChange={onSlideChange}
        className="per-view-slider__swiper"
      >
        {slideImageList.map((obj, i) => {
          if (i % 3 === 1) {
            return (
              <SwiperSlide key={i} className="per-view-slider__slide--two-rows">
                <div className="per-view-slider__slide--two-rows-content">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="per-view-slider__slide--two-rows-image"
                    src={obj.imageUrl1}
                    alt=""
                  />
                  {}
                  {obj.imageUrl2 && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className="per-view-slider__slide--two-rows-image"
                      src={obj.imageUrl2}
                      alt=""
                    />
                  )}
                </div>
              </SwiperSlide>
            );
          }

          return (
            <SwiperSlide
              key={i}
              className={clsx('per-view-slider__slide--one-row', {
                'per-view-slider__slide--one-row--ratio-1': i % 3 === 2,
                'per-view-slider__slide--one-row--ratio-2': i % 3 === 0,
              })}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="per-view-slider__slide--one-row-image" src={obj.imageUrl1} alt="" />
            </SwiperSlide>
          );
        })}
      </ReactSwiper>

      <ul
        className="per-view-slider__navigation"
        style={{ gridTemplateColumns: `repeat(${slidePaginationCount},1fr)` }}
      >
        {[...Array(slidePaginationCount)].map((_, i) => (
          <li key={i} className="per-view-slider__navigation-item">
            {activeIndex === i && (
              <motion.div layoutId="activeLine" className="per-view-slider__navigation-indicator" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
