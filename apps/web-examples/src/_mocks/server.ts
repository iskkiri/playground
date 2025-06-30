import { setupServer } from 'msw/node';
import { userHandlers } from '@/_features/user/mocks/handlers/userHandlers';
import { fileHandlers } from '@/_features/file/mocks/handlers/fileHandler';
// import { noticeHandlers } from '../app/(admin)/_features/notice/mocks/handlers/noticeHandlers';
// import { imageHandlers } from '@/_features/image/mocks/handlers/imageHandlers';
// import { bannerHandlers } from '@/app/(admin)/_features/banner/mocks/handlers/bannerHandlers';
// import { adminPopupHandlers as adminPopupHandlers } from '@/app/(admin)/_features/popup/mocks/handlers/popupHandlers';
// import { popUpHandlers as clientPopUpHandlers } from '@/app/(client)/_features/popUp/mocks/handlers/popUpHandlers';

export const server = setupServer(
  ...userHandlers,
  ...fileHandlers
  // ...imageHandlers,
  // ...noticeHandlers,
  // ...bannerHandlers,
  // ...adminPopupHandlers
  // ...clientPopUpHandlers
);
