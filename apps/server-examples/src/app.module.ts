import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from './common/options/config.options';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { OAuthModule } from './oauth/oauth.module';
import { FirebaseModule } from './firebase/firebase.module';
import { FcmModule } from './firebase/fcm/fcm.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    JwtModule.register({ global: true }),
    AuthModule,
    OAuthModule,
    FirebaseModule,
    FcmModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // https://docs.nestjs.com/migration-guide#express-v5
    consumer.apply(LoggerMiddleware).forRoutes('{*splat}');
  }
}
