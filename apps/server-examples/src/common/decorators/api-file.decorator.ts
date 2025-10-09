import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

export interface ApiFileOptions {
  fieldName?: string;
  description?: string;
}

export function ApiFile(options: ApiFileOptions = {}) {
  const { fieldName = 'file', description = '파일' } = options;

  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          [fieldName]: {
            type: 'string',
            format: 'binary',
            description,
          },
        },
      },
    }),
  );
}
