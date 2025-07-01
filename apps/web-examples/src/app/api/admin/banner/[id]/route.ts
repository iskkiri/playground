import { BadRequestException, HttpException } from '@/_shared/httpException';
import type { UpdateBannerRequestDto } from '@/app/(admin)/_features/banner/api/dtos/updateBanner.dto';
import bannerService from '@/app/(admin)/_features/banner/services/banner.service';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * @method GET
 * @url /api/admin/banner/[id]
 * @description 배너 상세 조회
 */
export async function GET(_request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  if (!id) {
    return HttpException.handler(new BadRequestException('id is required'));
  }

  try {
    const result = await bannerService.getBannerDetail(id);

    return NextResponse.json(result);
  } catch (err) {
    console.log(err);
    HttpException.handler(err);
  }
}

/**
 * @method PUT
 * @url /api/admin/banner/[id]
 * @description 배너 수정
 */
export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  if (!id) {
    return HttpException.handler(new BadRequestException('id is required'));
  }

  try {
    const updateBannerRequestDto = (await request.json()) as Omit<UpdateBannerRequestDto, 'id'>;

    const result = await bannerService.updateBanner({ id, ...updateBannerRequestDto });

    return NextResponse.json(result);
  } catch (err) {
    return HttpException.handler(err);
  }
}
