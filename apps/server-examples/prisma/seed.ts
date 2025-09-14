import { PrismaClient } from '@prisma/client';
import { seedAdmin } from './seeds/admin.seed';
import { seedCategories } from './seeds/category.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('데이터베이스 시딩 시작...');

  // 관리자 계정 생성
  await seedAdmin(prisma);

  // 카테고리 생성
  await seedCategories(prisma);

  console.log('데이터베이스 시딩 완료.');
}

main()
  .catch((e) => {
    console.error('시딩 중 오류 발생:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });