import type { CreatePopupRequestDto } from './createPopup.dto';

export interface UpdatePopupRequestDto extends CreatePopupRequestDto {
  id: string;
}
