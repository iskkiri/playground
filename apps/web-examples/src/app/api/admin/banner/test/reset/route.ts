import { HttpException } from '@/_shared/httpException';
import bannerService from '@/app/(admin)/_features/banner/services/banner.service';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    await bannerService.resetForTest();
    return NextResponse.json({ message: '배너 초기화 완료' });
  } catch (err) {
    return HttpException.handler(err);
  }
}
