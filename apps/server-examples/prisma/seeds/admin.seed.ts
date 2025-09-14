import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

export async function seedAdmin(prisma: PrismaClient) {
  const adminEmail = 'admin@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD!;

  // 기존 관리자 계정이 있는지 확인
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log('관리자 계정이 이미 존재합니다.');
    return;
  }

  // 비밀번호 해시화
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  // 관리자 계정 생성
  const admin = await prisma.user.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      name: '시스템 관리자',
      role: Role.ADMIN,
    },
  });

  console.log(`관리자 계정이 생성되었습니다: ${admin.email}`);
}
