import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/exception-filter/all-exception.filter';
import { PrismaClientExceptionFilter } from './common/exception-filter/prisma-client-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Server');
  const configService = app.get<ConfigService>(ConfigService);
  const isProduction = configService.get('NODE_ENV') === 'production';
  const PORT = configService.get<number>('PORT') || 8080;

  app.setGlobalPrefix('api');

  // CORS 설정
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  // Global ValidationPipe 설정
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  // Exception Filter
  const { httpAdapter } = app.get(HttpAdapterHost);
  // 뒤에 등록된 필터가 우선순위를 가지므로, 더 세부적인 필터(특정 exception만 캐치)를 뒤에 등록함
  app.useGlobalFilters(new AllExceptionsFilter(), new PrismaClientExceptionFilter(httpAdapter));
  // Interceptor
  app.useGlobalInterceptors(
    // 응답 데이터를 직렬화(serialize)할 때 사용되는 인터셉터
    // 엔티티 클래스에 정의된 @Exclude(), @Expose() 같은 데코레이터를 해석하여 응답에서 특정 속성을 제외하거나 포함
    new ClassSerializerInterceptor(app.get(Reflector))
  );

  if (!isProduction) {
    const config = new DocumentBuilder()
      .setTitle('Backend API')
      .setDescription('Backend API 문서')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(PORT, () => logger.log(`Server is running on ${PORT} port ✅`));
}
void bootstrap();
