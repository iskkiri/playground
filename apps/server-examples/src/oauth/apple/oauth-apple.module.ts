import { Module } from '@nestjs/common';
import { OAuthAppleService } from './oauth-apple.service';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [HttpModule, JwtModule],
  providers: [OAuthAppleService],
  exports: [OAuthAppleService],
})
export class OAuthAppleModule {}
