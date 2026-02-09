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

class AuthorDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '김철수' })
  name: string;

  @ApiProperty({ example: 'https://i.pravatar.cc/150?u=1' })
  avatar: string;
}

class CommentDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '좋은 글이네요!' })
  content: string;

  @ApiProperty({ type: AuthorDto })
  author: AuthorDto;

  @ApiProperty({ example: 15 })
  likes: number;

  @ApiProperty({ example: '2024-01-15T10:30:00Z' })
  createdAt: string;
}

class TagStatDto {
  @ApiProperty({ example: '개발' })
  name: string;

  @ApiProperty({ example: 25 })
  count: number;

  @ApiProperty({ example: 12.5 })
  percentage: number;
}

class MonthlyStatDto {
  @ApiProperty({ example: '2024-01' })
  month: string;

  @ApiProperty({ example: 15 })
  posts: number;

  @ApiProperty({ example: 230 })
  views: number;

  @ApiProperty({ example: 45 })
  likes: number;
}

export class PostStatisticsResponseDto {
  @ApiProperty({ example: 1 })
  postId: number;

  @ApiProperty({ example: '오늘의 일기' })
  title: string;

  @ApiProperty({ type: AuthorDto })
  author: AuthorDto;

  @ApiProperty({ type: [CommentDto] })
  topComments: CommentDto[];

  @ApiProperty({ type: [TagStatDto] })
  tagStats: TagStatDto[];

  @ApiProperty({ type: [MonthlyStatDto] })
  monthlyStats: MonthlyStatDto[];

  @ApiProperty({ example: { views: 1500, likes: 120, shares: 35, bookmarks: 22 } })
  engagement: {
    views: number;
    likes: number;
    shares: number;
    bookmarks: number;
  };
}
