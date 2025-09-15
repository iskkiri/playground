import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from './common/config/app.config';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { OAuthModule } from './oauth/oauth.module';
import { OAuthPassportModule } from './oauth-passport/oauth-passport.module';
import { FirebaseModule } from './firebase/firebase.module';
import { FcmModule } from './firebase/fcm/fcm.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    PrismaModule,
    AuthModule,
    UserModule,
    CategoryModule,
    OAuthModule,
    OAuthPassportModule,
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
