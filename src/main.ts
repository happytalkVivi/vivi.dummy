import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import * as Converter from 'api-spec-converter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // User API 문서 (OpenAPI 3.0)
  const userConfig = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('User 관련 API')
    .setVersion('1.0.0')
    .build();
  const userDocument = SwaggerModule.createDocument(app, userConfig, {
    include: [UsersModule],
  });
  SwaggerModule.setup('api/user', app, userDocument);

  // Posts API 문서 (Swagger 2.0으로 변환)
  const postsConfig = new DocumentBuilder()
    .setTitle('Posts API')
    .setDescription('게시글 관련 API')
    .setVersion('1.0.0')
    .build();
  const postsOas3Document = SwaggerModule.createDocument(app, postsConfig, {
    include: [PostsModule],
  });

  // OpenAPI 3.0 → Swagger 2.0 변환
  const converted = await Converter.convert({
    from: 'openapi_3',
    to: 'swagger_2',
    source: postsOas3Document,
  });
  const postsSwagger2Document = converted.spec;

  // Swagger 2.0 JSON 엔드포인트 제공
  app.getHttpAdapter().get('/api/posts-json', (req, res) => {
    res.json(postsSwagger2Document);
  });

  // Swagger UI는 OAS 3.0 버전으로 (UI 호환성)
  SwaggerModule.setup('api/posts', app, postsOas3Document);

  await app.listen(8084);
}
bootstrap();
