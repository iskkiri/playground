import { model, models, Schema, type Model } from 'mongoose';
import type { PopupEntity } from '../types/popup.types';
import '@/app/(admin)/_features/user/models/user.model';

export const popupSchema = new Schema<PopupEntity>(
  {
    title: {
      type: String,
      required: [true, '제목은 필수입니다'],
    },
    displayType: {
      type: String,
      required: [true, '디스플레이 타입은 필수입니다'],
    },
    pcPosition: {
      type: String,
      required: [true, 'PC 위치는 필수입니다'],
    },
    xCoordinate: {
      type: Number,
      required: [true, 'X 좌표는 필수입니다'],
    },
    yCoordinate: {
      type: Number,
      required: [true, 'Y 좌표는 필수입니다'],
    },
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
    imageUrl: {
      type: String,
      required: [true, '이미지 URL은 필수입니다'],
    },
    link: {
      type: String,
      default: null,
    },
    popupWidthStatus: {
      type: String,
      required: [true, '팝업 너비 상태는 필수입니다'],
    },
    imageWidth: {
      type: Number,
      default: null,
    },
    isShow: {
      type: Boolean,
      default: false,
      required: [true, '노출 상태는 필수입니다'],
    },
    order: {
      type: Number,
      default: null,
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
    timestamps: true,
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

const Popup: Model<PopupEntity> = models.Popup || model<PopupEntity>('Popup', popupSchema);

export default Popup;
