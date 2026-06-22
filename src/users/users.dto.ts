import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @ApiPropertyOptional({ example: '010-1234-5678' })
  phone?: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'John Doe' })
  name?: string;

  @ApiPropertyOptional({ example: 'john@example.com' })
  email?: string;

  @ApiPropertyOptional({ example: '010-1234-5678' })
  phone?: string;
}

class AddressDto {
  @ApiProperty({ example: '123 Main Street', description: '도로명 주소' })
  street: string;

  @ApiProperty({ example: 'Seoul', description: '도시명' })
  city: string;

  @ApiProperty({ example: 'Korea', description: '국가명' })
  country: string;

  @ApiProperty({ example: '12345', description: '우편번호' })
  zipCode: string;
}

class ActivityDto {
  @ApiProperty({ example: 1, description: '활동 고유 ID' })
  id: number;

  @ApiProperty({ example: 'login', description: '활동 유형 (login, post_create, comment, like, follow, profile_update)' })
  type: string;

  @ApiProperty({ example: '2024-01-15T10:30:00Z', description: '활동 발생 시각 (ISO 8601 형식)' })
  timestamp: string;

  @ApiProperty({ example: '192.168.1.1', description: '활동 발생 IP 주소' })
  ipAddress: string;
}

class StatsDto {
  @ApiProperty({ example: 150, description: '작성한 총 게시글 수' })
  totalPosts: number;

  @ApiProperty({ example: 1200, description: '받은 총 좋아요 수' })
  totalLikes: number;

  @ApiProperty({ example: 89, description: '팔로워 수' })
  followers: number;

  @ApiProperty({ example: 45, description: '팔로잉 수' })
  following: number;
}

export class UserProfileResponseDto {
  @ApiProperty({ example: 1, description: '유저 고유 ID' })
  id: number;

  @ApiProperty({ example: 'John Doe', description: '유저 이름' })
  name: string;

  @ApiProperty({ example: 'john@example.com', description: '유저 이메일 주소' })
  email: string;

  @ApiProperty({ example: 'https://i.pravatar.cc/150?u=1', description: '프로필 이미지 URL' })
  avatar: string;

  @ApiProperty({ type: AddressDto, description: '유저 주소 정보' })
  address: AddressDto;

  @ApiProperty({ type: StatsDto, description: '유저 활동 통계' })
  stats: StatsDto;

  @ApiProperty({ type: [ActivityDto], description: '최근 활동 내역 목록' })
  recentActivities: ActivityDto[];

  @ApiProperty({ example: ['tech', 'music', 'travel'], description: '관심사 목록' })
  interests: string[];

  @ApiProperty({ example: '2024-01-01T00:00:00Z', description: '계정 생성 일시 (ISO 8601 형식)' })
  createdAt: string;
}
