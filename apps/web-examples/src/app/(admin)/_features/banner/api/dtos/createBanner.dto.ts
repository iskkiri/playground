export interface CreateBannerRequestDto {
  title: string;
  mobileImage: string;
  mobileLink: string | null | undefined;
  pcImage: string;
  pcLink: string | null | undefined;
}
