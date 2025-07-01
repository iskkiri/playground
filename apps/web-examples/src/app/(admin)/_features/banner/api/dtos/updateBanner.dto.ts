import type { CreateBannerRequestDto } from './createBanner.dto';

export interface UpdateBannerRequestDto extends CreateBannerRequestDto {
  id: string;
}
