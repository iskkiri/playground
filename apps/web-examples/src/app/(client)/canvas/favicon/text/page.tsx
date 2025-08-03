'use client';

import React, { useCallback } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TextFaviconForm from '@/app/(client)/_features/favicon/components/TextFaviconForm';
import TextFaviconPreview from '@/app/(client)/_features/favicon/components/TextFaviconPreview';
import useDownloadFavicon from '@/app/(client)/_features/favicon/hooks/useDownloadFavicon';
import useGenerateTextFavicon from '@/app/(client)/_features/favicon/hooks/useGenerateTextFavicon';
import {
  textFaviconSchema,
  type TextFaviconSchema,
} from '@/app/(client)/_features/favicon/schemas/textFavicon.schema';
import GeneratedFavicons from '@/app/(client)/_features/favicon/components/GeneratedFavicons';

export default function ClientFaviconGenerator() {
  const { register, watch, handleSubmit, setValue } = useForm<TextFaviconSchema>({
    resolver: zodResolver(textFaviconSchema),
    defaultValues: {
      text: '',
      backgroundColor: '#ffffff', // 기본 배경색 (흰색)
      textColor: '#000000', // 기본 텍스트 색상 (검정색)
    },
  });

  // 파비콘 생성
  const { generateTextFavicon, generatedFavicons, setGeneratedFavicons } = useGenerateTextFavicon();

  const onSubmit: SubmitHandler<TextFaviconSchema> = useCallback(
    (data: TextFaviconSchema): void => {
      // 생성할 파비콘 크기들 정의 (일반적인 파비콘 크기들)
      const sizes: number[] = [16, 32, 48, 64];

      // 각 크기별로 파비콘 생성
      const favicons = sizes.map((size) => ({
        size,
        dataUrl: generateTextFavicon({
          text: data.text,
          backgroundColor: data.backgroundColor,
          textColor: data.textColor,
          size,
        }),
      }));

      // 생성된 파비콘들을 상태에 저장
      setGeneratedFavicons(favicons);
    },
    [generateTextFavicon, setGeneratedFavicons]
  );

  // 파비콘 다운로드
  const { onDownloadFavicon } = useDownloadFavicon();

  return (
    <div className="rounded-8 mx-auto max-w-2xl bg-white p-24 shadow-md">
      <h2 className="typography-h1-24r mb-24 text-center text-gray-800">
        클라이언트사이드 파비콘 생성기
      </h2>

      <div className="flex flex-col gap-24">
        {/* 사용자 입력 폼 섹션 */}
        <TextFaviconForm
          register={register}
          watch={watch}
          setValue={setValue}
          onSubmit={handleSubmit(onSubmit)}
        />

        {/* 미리보기 및 결과 표시 섹션 */}
        <div className="space-y-16">
          {/* 실시간 미리보기 - 사용자가 입력하는 동안 실시간으로 보여주는 미리보기 */}
          <TextFaviconPreview
            backgroundColor={watch('backgroundColor')}
            textColor={watch('textColor')}
            faviconText={watch('text')}
          />

          {/* 생성된 파비콘들 표시 - 생성 버튼을 눌렀을 때만 표시 */}
          {generatedFavicons.length > 0 && (
            <GeneratedFavicons
              generatedFavicons={generatedFavicons}
              onDownloadFavicon={onDownloadFavicon}
            />
          )}
        </div>
      </div>
    </div>
  );
}
