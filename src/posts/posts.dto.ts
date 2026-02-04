import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: '오늘의 일기' })
  title: string;

  @ApiProperty({ example: '오늘은 날씨가 좋았다.' })
  content: string;

  @ApiPropertyOptional({ example: ['일상', '일기'] })
  tags?: string[];
}

export class UpdatePostDto {
  @ApiPropertyOptional({ example: '수정된 제목' })
  title?: string;

  @ApiPropertyOptional({ example: '수정된 내용' })
  content?: string;

  @ApiPropertyOptional({ example: ['수정', '업데이트'] })
  tags?: string[];
}

export class LikePostResponseDto {
  @ApiProperty({ example: 1 })
  postId: number;

  @ApiProperty({ example: 150 })
  likes: number;

  @ApiProperty({ example: 'Post liked successfully' })
  message: string;
}
