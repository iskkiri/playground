import { BadRequestException, HttpException } from '@/_shared/httpException';
import popupService from '@/app/(admin)/_features/popup/services/popup.service';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * @method GET
 * @url /api/admin/popup/[id]
 * @description 팝업 상세 조회
 */
export async function GET(_request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  if (!id) {
    return HttpException.apiHandler(new BadRequestException('id is required'));
  }

  try {
    const result = await popupService.getPopupDetail(id);

    return NextResponse.json(result);
  } catch (err) {
    console.log(err);
    HttpException.apiHandler(err);
  }
}

/**
 * @method PUT
 * @url /api/admin/popup/[id]
 * @description 팝업 목록 조회
 */
export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  if (!id) {
    return HttpException.apiHandler(new BadRequestException('id is required'));
  }

  try {
    const updateBannerRequestDto = await request.json();

    const result = await popupService.updatePopup({ id, ...updateBannerRequestDto });

    return NextResponse.json(result);
  } catch (err) {
    return HttpException.apiHandler(err);
  }
}
