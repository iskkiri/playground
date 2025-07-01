import { nullable, primaryKey } from '@mswjs/data';
import type { FactoryAPI } from '@mswjs/data/lib/glossary';

export const bannerEntity = {
  id: primaryKey(Number),
  title: String,
  mobileImage: String,
  pcImage: String,
  mobileLink: nullable(String),
  pcLink: nullable(String),
  isShow: Boolean,
  order: nullable(Number),
  createdAt: Date,
};

export function initializeMockBanners(db: FactoryAPI<{ banner: typeof bannerEntity }>) {
  const now = new Date();

  Array.from({ length: 11 }).forEach((_, i) => {
    return db.banner.create({
      id: i + 1,
      title: `테스트 배너 ${i + 1}`,
      mobileImage:
        'https://d37qx3oivk5uc5.cloudfront.net/banner/sample5_xbX23HKfPA8KxVnGw4PRr.webp',
      pcImage: 'https://d37qx3oivk5uc5.cloudfront.net/banner/sample6_UHl7uj3TBmhFxSxRjtaLK.webp',
      mobileLink: 'https://naver.com',
      pcLink: 'https://google.com',
      isShow: i < 5,
      order: i < 5 ? i + 1 : null,
      createdAt: new Date(now.getTime() + i * 1000).toISOString(), // 1초씩 차이
    });
  });
}
