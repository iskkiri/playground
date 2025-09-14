import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import type { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. @Roles() 데코레이터에 설정된 역할(필요한 역할) 가져오기
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // 데코레이터가 없으면 누구나 접근 가능 (혹은 정책에 따라 차단)
    if (!requiredRoles) {
      return true;
    }

    // 2. 현재 요청을 보낸 사용자의 정보 조회 (JwtStrategy에서 반환한 값)
    const { user } = context.switchToHttp().getRequest<Request>();

    // 3. 사용자의 역할이 필요한 역할 중 하나라도 포함되는지 확인
    return requiredRoles.some((role) => user?.role === role);
  }
}
