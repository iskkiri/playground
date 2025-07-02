import { HttpException } from '@/_shared/httpException';
import popupService from '@/app/(admin)/_features/popup/services/popup.service';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    await popupService.resetForTest();
    return NextResponse.json({ message: '팝업 초기화 완료' });
  } catch (err) {
    return HttpException.apiHandler(err);
  }
}
