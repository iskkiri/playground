import { primaryKey } from '@mswjs/data';
import type { FactoryAPI } from '@mswjs/data/lib/glossary';

export const fileEntity = {
  id: primaryKey(Number),
  fileUrl: String,
  fileName: String,
};

export function initializeMockFiles(db: FactoryAPI<{ file: typeof fileEntity }>) {
  const fileId =
    db.file.getAll().length > 0 ? Math.max(...db.file.getAll().map((file) => file.id)) + 1 : 1;
  const files = [
    db.file.create({
      id: fileId,
      fileUrl: 'https://d37qx3oivk5uc5.cloudfront.net/notice/sample1_1749490085289.png',
      fileName: 'sample1.png',
    }),
    db.file.create({
      id: fileId + 1,
      fileUrl: 'https://d37qx3oivk5uc5.cloudfront.net/notice/sample3_1749490084940.png',
      fileName: 'sample3.png',
    }),
  ];

  return files;
}
