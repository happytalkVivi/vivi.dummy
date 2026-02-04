import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreatePostDto, UpdatePostDto, LikePostResponseDto } from './posts.dto';

const titles = ['오늘의 일기', 'NestJS 공부', '맛집 탐방', '여행 후기', '개발 팁', '일상 이야기', '책 리뷰', '영화 감상', '운동 기록', '요리 레시피'];
const contents = [
  '오늘은 정말 좋은 하루였다.',
  'NestJS를 배우면서 많은 것을 알게 되었다.',
  '새로 발견한 맛집이 너무 맛있었다.',
  '여행지에서 멋진 풍경을 봤다.',
  '이 팁을 알면 개발이 훨씬 쉬워진다.',
  '평범하지만 소중한 일상.',
  '이 책은 꼭 읽어봐야 한다.',
  '감동적인 영화였다.',
  '오늘도 운동 완료!',
  '간단하지만 맛있는 레시피를 공유한다.',
];
const tags = ['일상', '개발', '맛집', '여행', '팁', '리뷰', '운동', '요리', '공부', '취미'];
const authors = ['김철수', '이영희', '박민수', '정수진', '최동욱', '강지은', '윤서준', '임하늘', '한소희', '오민재'];

const randomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomTags = () => Array.from({ length: randomInt(1, 3) }, () => randomItem(tags));

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  private generatePost(id?: number) {
    return {
      id: id ?? randomInt(1, 1000),
      title: randomItem(titles),
      content: randomItem(contents),
      author: randomItem(authors),
      tags: randomTags(),
      views: randomInt(0, 10000),
      likes: randomInt(0, 500),
      comments: randomInt(0, 100),
      createdAt: new Date(Date.now() - randomInt(0, 365 * 24 * 60 * 60 * 1000)),
      updatedAt: new Date(Date.now() - randomInt(0, 30 * 24 * 60 * 60 * 1000)),
    };
  }

  @Get()
  @ApiOperation({ summary: '게시글 목록 조회' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: '조회할 개수' })
  @ApiQuery({ name: 'tag', required: false, type: String, description: '태그 필터' })
  getPosts(@Query('limit') limit?: number, @Query('tag') tag?: string) {
    const count = limit ?? 10;
    const posts = Array.from({ length: count }, () => this.generatePost());
    if (tag) {
      return posts.filter((post) => post.tags.includes(tag));
    }
    return posts;
  }

  @Get(':id')
  @ApiOperation({ summary: '게시글 상세 조회' })
  @ApiParam({ name: 'id', type: Number })
  getPost(@Param('id') id: number) {
    return this.generatePost(Number(id));
  }

  @Get(':id/comments')
  @ApiOperation({ summary: '게시글 댓글 조회' })
  @ApiParam({ name: 'id', type: Number })
  getPostComments(@Param('id') id: number) {
    const commentCount = randomInt(1, 5);
    return {
      postId: Number(id),
      comments: Array.from({ length: commentCount }, (_, i) => ({
        id: i + 1,
        author: randomItem(authors),
        content: '좋은 글이네요!',
        createdAt: new Date(Date.now() - randomInt(0, 7 * 24 * 60 * 60 * 1000)),
      })),
    };
  }

  @Post()
  @ApiOperation({ summary: '게시글 생성' })
  createPost(@Body() createPostDto: CreatePostDto) {
    return {
      ...this.generatePost(),
      ...createPostDto,
      message: 'Post created successfully',
    };
  }

  @Post(':id/like')
  @ApiOperation({ summary: '게시글 좋아요' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 201, description: '좋아요 성공', type: LikePostResponseDto })
  likePost(@Param('id') id: number) {
    return {
      postId: Number(id),
      likes: randomInt(1, 500) + 1,
      message: 'Post liked successfully',
    };
  }

  @Put(':id')
  @ApiOperation({ summary: '게시글 전체 수정' })
  @ApiParam({ name: 'id', type: Number })
  updatePost(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    return {
      ...this.generatePost(Number(id)),
      ...updatePostDto,
      message: 'Post updated successfully',
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: '게시글 부분 수정' })
  @ApiParam({ name: 'id', type: Number })
  patchPost(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    return {
      ...this.generatePost(Number(id)),
      ...updatePostDto,
      message: 'Post patched successfully',
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: '게시글 삭제' })
  @ApiParam({ name: 'id', type: Number })
  deletePost(@Param('id') id: number) {
    return {
      id: Number(id),
      deleted: true,
      message: 'Post deleted successfully',
    };
  }
}
