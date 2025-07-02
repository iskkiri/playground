'use client';

import SampleCard from '../_components/SampleCard';
import SpinLoading from '@repo/ui-tailwind/Loading/SpinLoading/SpinLoading';
import useInfnitieScroll from '../_hooks/useInfnitieScroll';
import useVirtualVerticalList from '../_hooks/useVirtualVerticalList';
import { formatDateTime } from '@repo/utils/formatDate';
import { sampleImageList } from '../_data/sample.data';

// 가상화가 적용된 무한 스크롤
export default function InfiniteScrollWithVirtualizationPage() {
  // 무한 스크롤
  const { observerRef, flatList, isFetchingNextPage, hasNextPage } = useInfnitieScroll();

  // Virtualization
  const { listRef, virtualizer } = useVirtualVerticalList({ flatList });

  return (
    <div className="py-100 xl:py-100 px-20 xl:px-0">
      <div className="max-w-600 mx-auto">
        <div
          ref={listRef}
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start - virtualizer.options.scrollMargin}px)`,
              }}
            >
              <SampleCard
                key={flatList[virtualRow.index].id}
                thumbnail={sampleImageList[flatList[virtualRow.index].id % sampleImageList.length]}
                captionText={formatDateTime(flatList[virtualRow.index].createdAt)}
                title={flatList[virtualRow.index].name}
                buttonText={`Button ${virtualRow.index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>

      <div ref={hasNextPage ? observerRef : null} className="h-0 w-0 opacity-0" />

      {isFetchingNextPage && (
        <div className="my-50 flex items-center justify-center">
          <SpinLoading />
        </div>
      )}
    </div>
  );
}
