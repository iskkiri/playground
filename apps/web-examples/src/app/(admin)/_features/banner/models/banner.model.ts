import { model, models, Schema, type Model } from 'mongoose';
import type { BannerEntity } from '../types/banner.types';
import '@/app/(admin)/_features/user/models/user.model';

export const bannerSchema = new Schema<BannerEntity>(
  {
    title: {
      type: String,
      required: [true, '제목은 필수입니다'],
      maxlength: [100, '제목은 100자를 초과할 수 없습니다'],
      trim: true,
    },
    mobileImage: {
      type: String,
      required: [true, '모바일 이미지는 필수입니다'],
    },
    mobileLink: {
      type: String,
    },
    pcImage: {
      type: String,
      required: [true, 'PC 이미지는 필수입니다'],
    },
    pcLink: {
      type: String,
    },
    isShow: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
    },
    // 작성자 추가
    author: {
      type: Schema.Types.ObjectId,
      ref: 'AdminUser', // User 모델 참조
      required: [true, '작성자는 필수입니다'],
      index: true, // 검색 성능 향상
    },
  },
  {
    timestamps: true, // createdAt, updatedAt 자동 생성
    toJSON: {
      transform: function (_doc, ret) {
        const { _id, __v, ...rest } = ret;
        return {
          id: _id,
          ...rest,
        };
      },
    },
  }
);

const Banner: Model<BannerEntity> = models.Banner || model<BannerEntity>('Banner', bannerSchema);

export default Banner;
