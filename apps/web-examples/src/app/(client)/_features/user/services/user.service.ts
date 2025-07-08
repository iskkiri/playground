import connectToDatabase from '@/_lib/mongodb';
import User from '../models/user.model';
import type { SignUpRequestDto } from '../dtos/signUp.dto';
import { BadRequestException, HttpException } from '@/_shared/httpException';
import { formatDate } from '@repo/utils/formatDate';

class UserService {
  /**
   * 회원가입
   * @param socialProvider 소셜 공급자
   * @param socialId 소셜 계정 ID
   * @param email 이메일
   * @param nickname 닉네임
   * @param gender 성별
   * @param birthDate 생년월일
   * @returns 회원가입 성공 여부
   */
  async signUp({
    //
    socialProvider,
    socialId,
    email,
    nickname,
    gender,
    birthDate,
  }: SignUpRequestDto) {
    try {
      await connectToDatabase();

      const isExist = await User.findOne().where({ socialId }).lean();
      if (isExist) throw new BadRequestException('이미 가입된 소셜 계정입니다.');

      await User.create({
        socialProvider,
        socialId,
        email,
        nickname,
        gender,
        birthDate: formatDate(birthDate),
      });

      return 'success';
    } catch (error) {
      console.error(error);
      throw HttpException.handler(error);
    }
  }

  /**
   * 소셜 계정 ID로 사용자 조회
   * @param socialId 소셜 계정 ID
   * @returns 사용자 정보
   */
  async findUserBySocialId(socialId: string) {
    await connectToDatabase();

    const user = await User.findOne().where({ socialId });
    if (!user) return null;

    return user.toJSON();
  }
}

const userService = new UserService();

export default userService;
