import { manyOf, nullable, primaryKey } from '@mswjs/data';
// import { fakerKO } from '@faker-js/faker';
import type { FactoryAPI } from '@mswjs/data/lib/glossary';
import { initializeMockFiles, type fileEntity } from '@/_features/file/mocks/file.db';

export const noticeEntity = {
  id: primaryKey(Number),
  title: String,
  content: String,
  isShow: Boolean,
  thumbnail: nullable(String),
  files: manyOf('file'),
  createdAt: Date,
};

export function initializeMockNotice(
  db: FactoryAPI<{
    notice: typeof noticeEntity;
    file: typeof fileEntity;
  }>
) {
  // const loremHtml =
  // '<h1>HTML Ipsum Presents</h1><a href="https://google.com">Link</a><p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis.</p><h2>Header1 Level 2</h2><ol><li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li><li>Aliquam tincidunt mauris eu risus.</li></ol><blockquote>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at felis aliquet congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis, tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.</blockquote><h3>Header1 Level 3</h3><ul><li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li><li>Aliquam tincidunt mauris eu risus.</li></ul><pre class="ql-syntax" spellcheck="false">#header h1 a { display: block; width: 300px; height: 80px; }</pre>';

  Array.from({ length: 101 }).forEach((_, i) => {
    const files = initializeMockFiles(db);
    const now = new Date();

    return db.notice.create({
      id: i + 1,
      title: `테스트 공지사항 ${i + 1}`,
      content: `이것은 ${i + 1}번째 테스트 공지사항입니다.`,
      isShow: i < 50 ? true : false,
      thumbnail: 'https://d37qx3oivk5uc5.cloudfront.net/notice/sample3_x1yK5M2deCYIw3gGsQw8L.webp',
      files,
      createdAt: new Date(now.getTime() + i * 1000).toISOString(), // 1초씩 차이
    });
  });
}
