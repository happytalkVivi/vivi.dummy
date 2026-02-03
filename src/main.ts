import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // User API 문서 (v3.0.0)
  const userConfig = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('User 관련 API')
    .setVersion('3.0.0')
    .build();
  const userDocument = SwaggerModule.createDocument(app, userConfig, {
    include: [UsersModule],
  });
  SwaggerModule.setup('api/user', app, userDocument);

  // Posts API 문서 (v2.0.0)
  const postsConfig = new DocumentBuilder()
    .setTitle('Posts API')
    .setDescription('게시글 관련 API')
    .setVersion('2.0.0')
    .build();
  const postsDocument = SwaggerModule.createDocument(app, postsConfig, {
    include: [PostsModule],
  });
  SwaggerModule.setup('api/posts', app, postsDocument);

  await app.listen(8084);
}
bootstrap();
