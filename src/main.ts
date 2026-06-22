import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import * as Converter from 'api-spec-converter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // 개별 Swagger UI (기존 유지)
  const userConfig = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('User 관련 API')
    .setVersion('1.0.0')
    .build();
  const userDocument = SwaggerModule.createDocument(app, userConfig, {
    include: [UsersModule],
  });
  SwaggerModule.setup('api/user', app, userDocument);

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

  SwaggerModule.setup('api/posts', app, postsOas3Document);

  // /docs: 모든 API를 하나로 합친 문서
  const allConfig = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription('전체 API')
    .setVersion('1.0.0')
    .build();
  const allDocument = SwaggerModule.createDocument(app, allConfig, {
    include: [UsersModule, PostsModule],
  });
  SwaggerModule.setup('docs', app, allDocument);

  // Swagger 2.0 JSON 엔드포인트 (기존 유지)
  app.getHttpAdapter().get('/api/posts-v2-json', (_req: any, res: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    res.json(postsSwagger2Document);
  });

  await app.listen(8144);
}
bootstrap();
