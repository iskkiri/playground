import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from '../auth/auth.service';
import { SignUpRequestDto } from './dtos/sign-up.dto';
import { SuccessResponseDto } from '@/common/dtos/success.dto';
import { GetMeResponseDto } from './dtos/get-me.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService
  ) {}

  /**
   * 회원가입
   * @param params - 회원가입 요청 데이터
   * @param params.email - 이메일
   * @param params.password - 비밀번호
   * @param params.name - 이름
   * @returns 회원가입 성공 여부
   */
  async signUp({ email, password, name }: SignUpRequestDto): Promise<SuccessResponseDto> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }

    const hashedPassword = await this.authService.hashPassword(password);

    await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return new SuccessResponseDto({ success: true });
  }

  /**
   * 내 정보 조회
   * @param id - 사용자 ID
   * @returns 내 정보
   */
  async getMe(id: number): Promise<GetMeResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    return new GetMeResponseDto(user);
  }
}
