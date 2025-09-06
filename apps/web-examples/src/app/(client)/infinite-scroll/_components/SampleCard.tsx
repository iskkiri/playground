import React from 'react';
import Image from 'next/image';
import Button from '@repo/ui/Button/Button';
import FeatherIcons from '@repo/icons/featherIcons';

interface SampleCardProps {
  thumbnail: string;
  title: string;
  buttonText: string;
  captionText: string;
}

export default React.memo(function SampleCard({
  thumbnail,
  title,
  buttonText,
  captionText,
}: SampleCardProps) {
  return (
    <div className="max-w-600 flex h-fit flex-col gap-16 xl:gap-20">
      <div className="rounded-14 group relative aspect-[305/186] overflow-hidden xl:aspect-[413/252]">
        <Image
          src={thumbnail}
          fill
          alt="thumbnail"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col gap-8 px-4">
        <p className="typography-p3-16b line-clamp-2 whitespace-pre-wrap">{title}</p>

        <span className="typography-p4-14r text-cool-gray-300 line-clamp-3">{captionText}</span>

        <Button
          variant="linePrimary"
          size={48}
          suffix={<FeatherIcons.ChevronRight size={20} />}
          className="w-full"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
});
