import { factory } from '@mswjs/data';
import { initializeMockUsers, userEntity } from '@/_features/user/mocks/user.db';
// import { fileEntity } from '@/_features/file/mocks/file.db';
// import { initializeMockNotice, noticeEntity } from '@/app/(admin)/_features/notice/mocks/notice.db';
// import {
//   initializeMockClientPopUp,
//   clientPopupEntity,
// } from '@/app/(client)/_features/popUp/mocks/popUp.db';
// import {
//   bannerEntity,
//   initializeMockBanners,
// } from '@/app/(admin)/_features/banner/mocks/banner.db';
// import {
//   initializeMockAdminPopup,
//   adminPopupEntity,
// } from '@/app/(admin)/_features/popup/mocks/popup.db';

const db = factory({
  user: userEntity,
  // notice: noticeEntity,
  // file: fileEntity,
  // banner: bannerEntity,
  // adminPopup: adminPopupEntity,
  // clientPopup: clientPopupEntity,
});

initializeMockUsers(db);
// initializeMockNotice(db);
// initializeMockBanners(db);
// initializeMockAdminPopup(db);
// initializeMockClientPopUp(db);

export default db;
