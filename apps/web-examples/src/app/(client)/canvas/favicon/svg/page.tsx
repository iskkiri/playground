'use client';

import React, { useCallback } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import GeneratedFavicons from '@/app/(client)/_features/favicon/components/GeneratedFavicons';
import SvgFaviconForm from '@/app/(client)/_features/favicon/components/SvgFaviconForm';
import SvgFaviconPreview from '@/app/(client)/_features/favicon/components/SvgFaviconPreview';
import { sampleIcons } from '@/app/(client)/_features/favicon/data/favicon.data';
import useDownloadFavicon from '@/app/(client)/_features/favicon/hooks/useDownloadFavicon';
import useGenerateSvgFavicon from '@/app/(client)/_features/favicon/hooks/useGenerateSvgFavicon';
import {
  svgFaviconSchema,
  type SvgFaviconSchema,
} from '@/app/(client)/_features/favicon/schemas/svgFavicon.schema';
import type { GeneratedFavicon } from '@/app/(client)/_features/favicon/types/favicon.types';

export default function SvgFaviconGeneratorPage() {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<SvgFaviconSchema>({
    resolver: zodResolver(svgFaviconSchema),
    defaultValues: {
      svgContent: sampleIcons.Box,
      backgroundColor: '#ffffff',
      iconColor: '#000000',
    },
  });

  const onSelectSampleIcon = useCallback(
    (iconPath: string) => () => {
      setValue('svgContent', iconPath);
    },
    [setValue]
  );

  const { generateSvgFavicon, generatedFavicons, setGeneratedFavicons } = useGenerateSvgFavicon();

  const onSubmit: SubmitHandler<SvgFaviconSchema> = useCallback(
    async ({ svgContent, backgroundColor, iconColor }) => {
      try {
        const sizes: number[] = [16, 32, 48, 64];
        const favicons: GeneratedFavicon[] = [];

        for (const size of sizes) {
          const dataUrl = await generateSvgFavicon({
            svgContent,
            backgroundColor,
            iconColor,
            size,
          });

          favicons.push({ size, dataUrl });
        }

        setGeneratedFavicons(favicons);
      } catch (error) {
        setError('svgContent', { type: 'manual', message: '파비콘 생성 중 오류가 발생했습니다.' });
        console.error('Favicon generation error:', error);
      }
    },
    [generateSvgFavicon, setError, setGeneratedFavicons]
  );

  const { onDownloadFavicon } = useDownloadFavicon();

  return (
    <div className="rounded-8 mx-auto max-w-4xl bg-white p-24 shadow-md">
      <h2 className="typography-h1-24r mb-24 text-center text-gray-800">SVG 기반 파비콘 생성기</h2>

      <div className="flex flex-col gap-24">
        {/* 입력 폼 */}
        <SvgFaviconForm
          sampleIcons={sampleIcons}
          onSelectSampleIcon={onSelectSampleIcon}
          register={register}
          watch={watch}
          setValue={setValue}
          onSubmit={handleSubmit(onSubmit)}
        />

        {/* 미리보기 및 결과 */}
        <div className="space-y-16">
          {/* 실시간 미리보기 */}
          <SvgFaviconPreview
            svgContent={watch('svgContent')}
            backgroundColor={watch('backgroundColor')}
            iconColor={watch('iconColor')}
          />
          {errors.svgContent && (
            <p className="typography-p4-14r text-error-600 mt-4">{errors.svgContent.message}</p>
          )}

          {/* 생성된 파비콘들 */}
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
