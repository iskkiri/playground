import { useCallback, useRef, useState } from 'react';
import { SwiperRef } from 'swiper/react';
import { Swiper } from 'swiper/types';

export default function useSlide() {
  const swiperRef = useRef<SwiperRef | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const onSlideChange = useCallback((swiper: Swiper) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  // 좌우 버튼 클릭 시 이동
  const onPrevSlide = useCallback(() => {
    swiperRef.current?.swiper.slidePrev();
  }, []);
  const onNextSlide = useCallback(() => {
    swiperRef.current?.swiper.slideNext();
  }, []);

  // 특정 슬라이드로 이동
  const onSlideTo = useCallback(
    (slideIndex: number) => () => {
      swiperRef.current?.swiper?.slideTo(slideIndex);
    },
    []
  );

  // loop가 활성화된 슬라이드의 경우, slideToLoop 이용하여야 정상적으로 동작
  const onSlideToLoop = useCallback(
    (slideIndex: number) => () => {
      swiperRef.current?.swiper.slideToLoop(slideIndex);
    },
    []
  );

  const onTogglePlay = useCallback(() => {
    const swiper = swiperRef.current?.swiper;
    if (!swiper) return;

    if (swiper.autoplay.paused) {
      swiperRef.current?.swiper.autoplay.resume();
      setIsPaused(false);
    } else {
      swiperRef.current?.swiper.autoplay.pause();
      setIsPaused(true);
    }
  }, []);

  return {
    swiperRef,
    activeIndex,
    isPaused,
    onSlideChange,
    onPrevSlide,
    onNextSlide,
    onSlideTo,
    onSlideToLoop,
    onTogglePlay,
  };
}
