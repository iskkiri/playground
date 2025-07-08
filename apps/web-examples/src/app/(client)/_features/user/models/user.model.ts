import { BadRequestException } from '@/_shared/httpException';
import dayjs from 'dayjs';
import mongoose, { Document, models, Schema, type Model } from 'mongoose';

// 열거형 타입 정의
enum SocialProvider {
  google = 'google',
  naver = 'naver',
  kakao = 'kakao',
}

enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

// User 인터페이스 정의
export interface IUser extends Document {
  socialProvider: SocialProvider;
  socialId: string;
  email: string;
  nickname: string;
  gender: Gender;
  birthDate: string;
  createdAt: Date;
  updatedAt: Date;
}

// User 스키마 정의
const userSchema = new Schema<IUser>(
  {
    socialProvider: {
      type: String,
      enum: Object.values(SocialProvider),
      required: [true, '소셜 로그인 제공자는 필수입니다'],
      comment: '소셜 로그인 제공자',
    },
    socialId: {
      type: String,
      required: [true, '소셜 계정 ID는 필수입니다'],
      unique: true,
      comment: '소셜계정 고유 ID',
    },
    email: {
      type: String,
      required: [true, '이메일은 필수입니다'],
      lowercase: true,
      trim: true,
      comment: '이메일 주소',
    },
    nickname: {
      type: String,
      required: [true, '닉네임은 필수입니다'],
      unique: [true, '이미 존재하는 닉네임입니다'],
      comment: '닉네임',
    },
    gender: {
      type: String,
      enum: Object.values(Gender),
      required: [true, '성별은 필수입니다'],
      comment: '성별',
    },
    birthDate: {
      type: String,
      required: [true, '생년월일은 필수입니다'],
      comment: '생년월일 (YYYY-MM-DD 형태)',
      validate: [
        {
          validator: function (value: string) {
            return /^\d{4}-\d{2}-\d{2}$/.test(value);
          },
          message: '날짜 형식은 YYYY-MM-DD여야 합니다',
        },
        {
          validator: function (value: string) {
            const birthDate = dayjs(value);
            const minAge14Date = dayjs().subtract(14, 'year');
            return birthDate.isBefore(minAge14Date, 'day');
          },
          message: '만 14세 이상만 가입할 수 있습니다',
        },
      ],
    },
  },
  {
    timestamps: true, // createdAt, updatedAt 자동 생성
    collection: 'users', // 컬렉션 이름 명시
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

// 인덱스 설정 (성능 최적화)
userSchema.index({ email: 1 });
userSchema.index({ socialProvider: 1, socialId: 1 });

// 커스텀 중복 체크 미들웨어 추가
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  if (user.isModified('nickname')) {
    const exists = await User.findOne({ nickname: user.nickname });
    if (exists) {
      next(new BadRequestException('이미 존재하는 닉네임입니다'));
      return;
    }
  }
  next();
});

// User 모델 생성 및 export
const User: Model<IUser> = models.User || mongoose.model<IUser>('User', userSchema);

export default User;
