import { PrismaClient } from '@prisma/client';

export async function seedCategories(prisma: PrismaClient) {
  console.log('카테고리 시딩 시작...');

  // 기본 카테고리 데이터
  const categories = [
    {
      name: 'Technology',
      description: '기술, 프로그래밍, IT 관련 게시글',
    },
    {
      name: 'News',
      description: '최신 뉴스 및 시사 관련 게시글',
    },
    {
      name: 'Lifestyle',
      description: '라이프스타일, 취미, 일상 관련 게시글',
    },
    {
      name: 'Business',
      description: '비즈니스, 경제, 창업 관련 게시글',
    },
    {
      name: 'Entertainment',
      description: '엔터테인먼트, 문화, 예술 관련 게시글',
    },
  ];

  // 카테고리 upsert (생성 또는 업데이트)
  for (const categoryData of categories) {
    await prisma.category.upsert({
      where: { name: categoryData.name },
      update: {
        description: categoryData.description,
      },
      create: categoryData,
    });
  }

  console.log(`${categories.length}개의 카테고리가 처리되었습니다.`);
}