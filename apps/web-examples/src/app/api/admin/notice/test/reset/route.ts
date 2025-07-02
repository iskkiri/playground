import { HttpException } from '@/_shared/httpException';
import noticeService from '@/app/(admin)/_features/notice/services/notice.service';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    await noticeService.resetForTest();
    return NextResponse.json({ message: '공지사항 초기화 완료' });
  } catch (err) {
    return HttpException.apiHandler(err);
  }
}
