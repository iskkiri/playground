'use client';

import SampleCard from '../_components/SampleCard';
import useInfnitieScroll from '../_hooks/useInfnitieScroll';
import SpinLoading from '@repo/ui-tailwind/Loading/SpinLoading/SpinLoading';
import { sampleImageList } from '../_data/sample.data';

// 가상화가 적용되지 않은 무한 스크롤
export default function InfiniteScrollPage() {
  // 무한 스크롤
  const { observerRef, flatList, isFetchingNextPage, hasNextPage } = useInfnitieScroll();

  return (
    <div className="py-100 xl:py-100 px-20 xl:px-0">
      <div className="max-w-1200 mx-auto">
        <div className="grid grid-cols-2 gap-20 md:grid-cols-3 xl:grid-cols-4">
          {flatList.map((item, index) => (
            <SampleCard
              key={item.id}
              thumbnail={sampleImageList[item.id % sampleImageList.length]}
              captionText={item.createdAt}
              title={item.name}
              buttonText={`Button ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div ref={hasNextPage ? observerRef : null} className="h-0 w-0 opacity-0" />

      <div className="my-50 flex items-center justify-center">
        {isFetchingNextPage && <SpinLoading />}
      </div>
    </div>
  );
}
