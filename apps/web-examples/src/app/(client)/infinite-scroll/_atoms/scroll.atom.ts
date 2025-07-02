import type { VirtualItem } from '@tanstack/react-virtual';
import { atom } from 'jotai';

interface ScrollInfo {
  key: string;
  scrollOffset: number;
  measurementsCache: VirtualItem[];
}

const scrollInfosAtom = atom<ScrollInfo[]>([]);

export const virtualVerticalListScrollInfoAtom = createScrollInfoAtomByKey('virtual-vertical-list');
export const virtualGridListScrollInfoAtom = createScrollInfoAtomByKey('virtual-grid-list');

// 특정 키에 대해서 scrollInfoAtom을 생성
function createScrollInfoAtomByKey(key: string) {
  return atom(
    // 읽기 함수
    (get) => {
      const scrollInfoList = get(scrollInfosAtom);
      return scrollInfoList.find((info) => info.key === key) || null;
    },
    // 쓰기 함수
    (
      get,
      set,
      updater:
        | Omit<ScrollInfo, 'key'>
        | null
        | ((prev: ScrollInfo | null) => Omit<ScrollInfo, 'key'> | null)
    ) => {
      const scrollInfoList = get(scrollInfosAtom);
      const currentInfo = scrollInfoList.find((info) => info.key === key) || null;

      // updater가 함수인 경우 함수를 실행하여 새 값을 얻음
      const newScrollInfo = typeof updater === 'function' ? updater(currentInfo) : updater;

      if (newScrollInfo === null) {
        // 항목 제거
        set(
          scrollInfosAtom,
          scrollInfoList.filter((info) => info.key !== key)
        );
      } else {
        const existingIndex = scrollInfoList.findIndex((info) => info.key === key);

        if (existingIndex >= 0) {
          // 기존 항목 업데이트
          const newList = [...scrollInfoList];
          newList[existingIndex] = { key, ...newScrollInfo };
          set(scrollInfosAtom, newList);
        } else {
          // 새 항목 추가
          set(scrollInfosAtom, [...scrollInfoList, { key, ...newScrollInfo }]);
        }
      }
    }
  );
}

scrollInfosAtom.debugLabel = 'scrollInfosAtom';
