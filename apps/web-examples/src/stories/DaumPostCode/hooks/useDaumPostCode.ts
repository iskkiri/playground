import { useCallback } from 'react';
import { Address, useDaumPostcodePopup } from 'react-daum-postcode';
import { formatFullAddress } from '../utils/address.util';

interface UseDaumPostCodeParams {
  onCompleteAddress: (address: string) => void;
}

const useDaumPostCode = ({ onCompleteAddress }: UseDaumPostCodeParams) => {
  const open = useDaumPostcodePopup();

  const onComplete = useCallback(
    (data: Address) => {
      const fullAddress = formatFullAddress(data);

      onCompleteAddress(fullAddress);
    },
    [onCompleteAddress]
  );

  const onOpenDaumPostCode = useCallback(() => {
    // 팝업창을 화면 중앙에 위치시키기 위한 계산
    const width = 500;
    const height = 500;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    open({
      onComplete,
      popupTitle: '주소검색',
      width,
      height,
      top,
      left,
    });
  }, [onComplete, open]);

  return { onComplete, onOpenDaumPostCode };
};

export default useDaumPostCode;
