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
  @ApiProperty({ example: '123 Main Street' })
  street: string;

  @ApiProperty({ example: 'Seoul' })
  city: string;

  @ApiProperty({ example: 'Korea' })
  country: string;

  @ApiProperty({ example: '12345' })
  zipCode: string;
}

class ActivityDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'login' })
  type: string;

  @ApiProperty({ example: '2024-01-15T10:30:00Z' })
  timestamp: string;

  @ApiProperty({ example: '192.168.1.1' })
  ipAddress: string;
}

class StatsDto {
  @ApiProperty({ example: 150 })
  totalPosts: number;

  @ApiProperty({ example: 1200 })
  totalLikes: number;

  @ApiProperty({ example: 89 })
  followers: number;

  @ApiProperty({ example: 45 })
  following: number;
}

export class UserProfileResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @ApiProperty({ example: 'https://i.pravatar.cc/150?u=1' })
  avatar: string;

  @ApiProperty({ type: AddressDto })
  address: AddressDto;

  @ApiProperty({ type: StatsDto })
  stats: StatsDto;

  @ApiProperty({ type: [ActivityDto] })
  recentActivities: ActivityDto[];

  @ApiProperty({ example: ['tech', 'music', 'travel'] })
  interests: string[];

  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  createdAt: string;
}
