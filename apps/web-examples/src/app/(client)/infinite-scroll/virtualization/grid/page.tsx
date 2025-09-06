'use client';

import SampleCard from '../../_components/SampleCard';
import useInfnitieScroll from '../../_hooks/useInfnitieScroll';
import SpinLoading from '@repo/ui/Loading/SpinLoading/SpinLoading';
import useVirutalGridList from '../../_hooks/useVirutalGridList';
import { formatDateTime } from '@repo/utils/formatDate';
import { sampleImageList } from '../../_data/sample.data';

// 가상화가 적용된 무한 스크롤 (Grid)
export default function InfiniteScrollWithVirtualizationGridPage() {
  // 무한 스크롤
  const { observerRef, flatList, isFetchingNextPage, hasNextPage } = useInfnitieScroll();

  // Virtualization
  const { listRef, virtualizer } = useVirutalGridList({ flatList });

  return (
    <div className="py-100 xl:py-100 px-20 xl:px-0">
      <div className="max-w-1200 mx-auto">
        <div
          ref={listRef}
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const startIndex = virtualRow.index * 12;
            const gridItems = flatList.slice(startIndex, startIndex + 12);

            return (
              <div
                key={virtualRow.key}
                ref={virtualizer.measureElement}
                data-index={virtualRow.index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualRow.start - virtualizer.options.scrollMargin}px)`,
                }}
              >
                <div className="grid grid-cols-2 gap-20 md:grid-cols-3 xl:grid-cols-4">
                  {gridItems.map((item) => (
                    <SampleCard
                      key={item.id}
                      thumbnail={sampleImageList[item.id % sampleImageList.length]}
                      captionText={formatDateTime(item.createdAt)}
                      title={item.name}
                      buttonText={`Button ${item.id}`}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div ref={hasNextPage ? observerRef : null} className="h-0 w-0 opacity-0" />

      <div className={isFetchingNextPage ? 'my-50 flex items-center justify-center' : ''}>
        {isFetchingNextPage && <SpinLoading />}
      </div>
    </div>
  );
}
