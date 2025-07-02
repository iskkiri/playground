import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PortoneModule } from '@/portone/portone.module';

@Module({
  imports: [PortoneModule],
  controllers: [AuthController],
})
export class AuthModule {}
