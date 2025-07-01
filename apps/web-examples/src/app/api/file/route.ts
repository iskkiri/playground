import { BadRequestException, HttpException } from '@/_shared/httpException';
import fileService from '@/_features/file/services/file.service';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
  const { filenames } = await request.json();

  if (!filenames || !Array.isArray(filenames) || filenames.length === 0) {
    return BadRequestException.handler('삭제할 파일명이 제공되지 않았습니다.');
  }

  try {
    const result = await fileService.deleteFiles(filenames);

    return NextResponse.json(result);
  } catch (err) {
    return HttpException.handler(err);
  }
}
