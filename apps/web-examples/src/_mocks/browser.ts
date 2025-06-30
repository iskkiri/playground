import { setupWorker } from 'msw/browser';
import { userHandlers } from '@/_features/user/mocks/handlers/userHandlers';
// import { noticeHandlers } from '../app/(admin)/_features/notice/mocks/handlers/noticeHandlers';
// import { bannerHandlers } from '@/app/(admin)/_features/banner/mocks/handlers/bannerHandlers';
// import { adminPopupHandlers } from '@/app/(admin)/_features/popup/mocks/handlers/popupHandlers';
// import { clientPopupHandlers } from '@/app/(client)/_features/popUp/mocks/handlers/popUpHandlers';

export const worker = setupWorker(
  ...userHandlers
  // ...noticeHandlers,
  // ...bannerHandlers,
  // ...adminPopupHandlers,
  // ...clientPopupHandlers
);
