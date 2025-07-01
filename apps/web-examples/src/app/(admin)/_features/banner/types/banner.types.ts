import type { AdminUser } from '../../user/types/user.types';

export interface BannerEntity {
  id: string;
  title: string;
  mobileImage: string;
  mobileLink: string | null;
  pcImage: string;
  pcLink: string | null;
  isShow: boolean;
  order: number | null;
  author: AdminUser;
  createdAt: string;
  updatedAt: string;
}
