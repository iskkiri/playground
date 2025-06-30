import { useMemo } from 'react';
import type { ImageSchema } from '../../schemas/image.schema';
import FeatherIcons from '@repo/icons/featherIcons';
import { cn } from '@repo/utils/cn';
import Image from 'next/image';

interface AdminImageFieldAttachmentProps {
  isPreviewImageVisible?: boolean;
  insertedImageObj: ImageSchema;
  onInsertImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (e: React.MouseEvent) => void;
  ariaLabel?: string;
  className?: string;
}

export default function ImageAttachment({
  isPreviewImageVisible = true,
  insertedImageObj,
  onInsertImage,
  onRemoveImage,
  ariaLabel,
  className,
}: AdminImageFieldAttachmentProps) {
  const imageUrl = useMemo(
    () => insertedImageObj?.blobImage || insertedImageObj?.storageImage,
    [insertedImageObj]
  );

  return (
    <div className={cn('flex flex-col gap-10', className)}>
      {isPreviewImageVisible && imageUrl && (
        <Image
          src={imageUrl}
          width={800}
          height={800}
          alt="업로드된 이미지"
          className="w-400 h-400 object-cover"
        />
      )}

      <div className="flex items-center gap-8">
        <label
          className={cn(
            'rounded-4 bg-primary hover:bg-primary-hover typography-p4-14r flex h-36 w-fit cursor-pointer items-center justify-center gap-4 px-10 py-8 font-medium text-white',
            'has-[input:focus-visible]:outline-primary has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2'
          )}
          role="button"
          aria-label={ariaLabel}
        >
          <input
            onChange={onInsertImage}
            key={insertedImageObj?.file?.name}
            type="file"
            accept="image/*"
            className="sr-only"
          />

          <FeatherIcons.Image size={20} aria-hidden="true" />
          <span>이미지 첨부</span>
        </label>

        {insertedImageObj?.file && (
          <div className="rounded-100 text-primary typography-p5-12r flex items-center gap-4 bg-gray-100 px-12 py-8">
            <span>{insertedImageObj.file.name}</span>

            <button
              onClick={onRemoveImage}
              className="flex items-center justify-center"
              aria-label="이미지 제거"
            >
              <FeatherIcons.X size={14} color="var(--primary-hover)" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
      <p className="typography-p4-14r text-gray-400" role="note">
        확장자 Jpeg, jpg, png, gif / 용량 최대 5mb 까지 첨부 가능
      </p>
    </div>
  );
}
