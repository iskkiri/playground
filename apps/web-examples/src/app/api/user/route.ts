import { BadRequestException, HttpException } from '@/_shared/httpException';
import userService from '@/app/(client)/_features/user/services/user.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.url).searchParams;
  const socialId = searchParams.get('socialId');

  try {
    if (!socialId) throw new BadRequestException('socialId is required');

    const user = await userService.findUserBySocialId(socialId);

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return HttpException.apiHandler(error);
  }
}
