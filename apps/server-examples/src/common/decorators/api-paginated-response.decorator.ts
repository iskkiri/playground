import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginationResponseDto } from '../dtos/pagination.dto';

export const ApiOkPaginationResponse = <TModel extends Type>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(PaginationResponseDto, model),
    ApiOkResponse({
      schema: {
        type: 'object',
        properties: {
          content: {
            type: 'array',
            items: { $ref: getSchemaPath(model) },
            description: '아이템 목록',
          },
          page: {
            type: 'number',
            description: '현재 페이지',
            example: 1,
          },
          pageSize: {
            type: 'number',
            description: '페이지 크기',
            example: 10,
          },
          totalPages: {
            type: 'number',
            description: '총 페이지 수',
            example: 10,
          },
          totalElements: {
            type: 'number',
            description: '총 아이템 수',
            example: 100,
          },
          searchElements: {
            type: 'number',
            description: '검색된 아이템 수',
            example: 10,
          },
          hasNextPage: {
            type: 'boolean',
            description: '다음 페이지 여부',
            example: true,
          },
          hasPreviousPage: {
            type: 'boolean',
            description: '이전 페이지 여부',
            example: false,
          },
        },
      },
    })
  );
};
