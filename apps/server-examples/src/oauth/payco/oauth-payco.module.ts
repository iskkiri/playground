import { Module } from '@nestjs/common';
import { OAuthPaycoService } from './oauth-payco.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [OAuthPaycoService],
  exports: [OAuthPaycoService],
})
export class OAuthPaycoModule {}
