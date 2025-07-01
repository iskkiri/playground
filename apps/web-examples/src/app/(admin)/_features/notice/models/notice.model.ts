import { model, models, Schema, type Model } from 'mongoose';
import { attachedFileSchema } from '@/_features/file/models/file.model';
import type { NoticeEntity } from '../types/notice.types';
// mongoose는 모델을 사용하기 전에 반드시 등록되어야 하는데, populate할 때도 참조되는 모델이 등록되어 있어야 합니다.
import '@/app/(admin)/_features/user/models/user.model';

export const noticeSchema = new Schema<NoticeEntity>(
  {
    title: {
      type: String,
      required: [true, '제목은 필수입니다'],
      maxlength: [100, '제목은 100자를 초과할 수 없습니다'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, '내용은 필수입니다'],
    },
    isShow: {
      type: Boolean,
      default: false,
    },
    thumbnail: {
      type: String,
      required: [true, '썸네일은 필수입니다'],
    },
    files: {
      type: [attachedFileSchema],
      default: [],
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

const Notice: Model<NoticeEntity> = models.Notice || model<NoticeEntity>('Notice', noticeSchema);

export default Notice;
