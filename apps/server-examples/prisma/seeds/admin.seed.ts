import { PrismaClient, Role } from 'generated/prisma';
import * as bcrypt from 'bcryptjs';

export async function seedAdmin(prisma: PrismaClient) {
  const adminEmail = 'admin@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD!;

  // 비밀번호 해시화
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  // 관리자 계정 upsert (생성 또는 업데이트)
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
      name: '시스템 관리자',
      role: Role.ADMIN,
    },
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: '시스템 관리자',
      role: Role.ADMIN,
    },
  });

  console.log(`관리자 계정이 처리되었습니다: ${admin.email}`);
}
