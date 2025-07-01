import { model, models, Schema } from 'mongoose';
import type { AdminUser } from '../types/user.types';

const adminUserSchema = new Schema<AdminUser>(
  {
    name: {
      type: String,
      required: [true, '이름은 필수입니다'],
    },
    email: {
      type: String,
      required: [true, '이메일은 필수입니다'],
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
    collection: 'admin_users',
  }
);

const AdminUser = models.AdminUser || model<AdminUser>('AdminUser', adminUserSchema);

export default AdminUser;
