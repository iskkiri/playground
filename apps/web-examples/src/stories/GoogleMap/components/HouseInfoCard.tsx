import Image from 'next/image';
import { cn } from '@repo/utils/cn';

interface HouseInfoCardProps {
  thumbnail: string;
  lodgingName: string;
  country: string;
  city: string;
  className?: string;
}

export default function HouseInfoCard({
  thumbnail,
  lodgingName,
  country,
  city,
  className,
}: HouseInfoCardProps) {
  return (
    <div
      className={cn(
        'absolute left-1/2 top-full -translate-x-1/2 translate-y-8',
        'w-200 flex flex-col',
        'rounded-16 overflow-hidden bg-white shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)]',
        className
      )}
    >
      <Image
        src={thumbnail}
        className="h-120 w-full object-cover"
        width={200}
        height={200}
        alt="숙소 이미지"
      />

      <div className="flex flex-col gap-8 p-16">
        <b className="typography-p4-14b text-black">{lodgingName}</b>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-[22px_auto] gap-8">
            <b className="typography-p5-12b text-cool-gray-80">국가</b>
            <span className="typography-p5-12r text-cool-gray-50">{country}</span>
          </div>

          <div className="grid grid-cols-[22px_auto] gap-8">
            <b className="typography-p5-12b text-cool-gray-80">도시</b>
            <span className="typography-p5-12r text-cool-gray-50">{city}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
