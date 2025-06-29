import React, { useCallback, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import useDaumPostCode from './hooks/useDaumPostCode';
import TextInput from '@repo/ui-tailwind/TextInput/TextInput';
import Button from '@repo/ui-tailwind/Button/Button';
import DaumPostCode from './DaumPostCode';
import type { ICoordinates } from './types/coordinates.types';
import useCoordinates from './hooks/useCoordinates';

const meta = {
  title: 'components/DaumPostCode',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 팝업 방식
 */
export const PopUp: Story = {
  render: function Render() {
    const [address, setAddress] = useState('');

    const { onOpenDaumPostCode } = useDaumPostCode({ onCompleteAddress: setAddress });

    return (
      <div className="flex gap-16">
        <TextInput readOnly placeholder="주소를 입력해주세요." value={address} className="w-400" />
        <Button variant="primary" onClick={onOpenDaumPostCode}>
          주소검색
        </Button>
      </div>
    );
  },
};

/**
 * Embed 방식
 */
export const Embed: Story = {
  render: function Render() {
    const [address, setAddress] = useState('');

    const [isOpenPostCode, setIsOpenPostCode] = useState(false);
    const onOpenPostCode = useCallback(() => setIsOpenPostCode(true), []);
    const onClosePostCode = useCallback(() => setIsOpenPostCode(false), []);

    const onCompleteAddress = useCallback(
      (address: string) => {
        setAddress(address);
        onClosePostCode();
      },
      [onClosePostCode]
    );

    return (
      <div className="flex flex-col gap-32">
        <div className="flex gap-16">
          <TextInput
            readOnly
            placeholder="주소를 입력해주세요."
            value={address}
            className="w-400"
          />
          <Button variant="primary" onClick={onOpenPostCode}>
            주소검색
          </Button>
        </div>

        {isOpenPostCode && (
          <DaumPostCode onCompleteAddress={onCompleteAddress} onClose={onClosePostCode} />
        )}
      </div>
    );
  },
};

/**
 * 검색한 주소로부터 위도/경도 조회
 */
export const Coordinates: Story = {
  render: function Render() {
    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState<ICoordinates>({
      latitude: undefined,
      longitude: undefined,
    });

    const { getCoordinatesFromAddress } = useCoordinates();
    const onCompleteAddress = useCallback(
      async (address: string) => {
        const coordinates = await getCoordinatesFromAddress(address);
        if (!coordinates) {
          alert(
            '주소와 일치하는 좌표값이 존재하지 않습니다.\n지번 주소 혹은 다른 도로명 주소를 선택해주세요.'
          );
          return;
        }

        setAddress(address);
        setCoordinates(coordinates);
      },
      [getCoordinatesFromAddress]
    );

    const { onOpenDaumPostCode } = useDaumPostCode({ onCompleteAddress });

    return (
      <div className="flex flex-col gap-16">
        <div className="flex gap-16">
          <TextInput
            readOnly
            placeholder="주소를 입력해주세요."
            value={address}
            className="w-400"
          />
          <Button variant="primary" onClick={onOpenDaumPostCode}>
            주소검색
          </Button>
        </div>

        <div className="flex flex-col gap-8">
          <p>위도: {coordinates.latitude}</p>
          <p>경도: {coordinates.longitude}</p>
        </div>
      </div>
    );
  },
};
