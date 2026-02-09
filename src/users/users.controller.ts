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
import { CreateUserDto, UpdateUserDto, UserProfileResponseDto } from './users.dto';

const firstNames = ['John', 'Jane', 'Mike', 'Sarah', 'Tom', 'Emily', 'David', 'Lisa', 'Chris', 'Anna'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Wilson', 'Lee'];
const cities = ['Seoul', 'Tokyo', 'New York', 'London', 'Paris', 'Berlin', 'Sydney', 'Toronto', 'Singapore', 'Dubai'];
const countries = ['Korea', 'Japan', 'USA', 'UK', 'France', 'Germany', 'Australia', 'Canada', 'Singapore', 'UAE'];

const randomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

@ApiTags('Users')
@Controller('users')
export class UsersController {
  private generateUser(id?: number) {
    const firstName = randomItem(firstNames);
    const lastName = randomItem(lastNames);
    return {
      id: id ?? randomInt(1, 1000),
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      avatar: `https://i.pravatar.cc/150?u=${randomInt(1, 1000)}`,
      phone: `010-${randomInt(1000, 9999)}-${randomInt(1000, 9999)}`,
      address: {
        street: `${randomInt(1, 999)} ${randomItem(lastNames)} Street`,
        city: randomItem(cities),
        country: randomItem(countries),
      },
      createdAt: new Date(Date.now() - randomInt(0, 365 * 24 * 60 * 60 * 1000)),
    };
  }

  @Get()
  @ApiOperation({ summary: '유저 목록 조회' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  getUsers(@Query('limit') limit?: number) {
    const count = limit ?? 10;
    return Array.from({ length: count }, () => this.generateUser());
  }

  @Get(':id')
  @ApiOperation({ summary: '유저 상세 조회', description: '디스크립션이 있는 API' })
  @ApiParam({ name: 'id', type: Number })
  getUser(@Param('id') id: number) {
    return this.generateUser(Number(id));
  }

  @Post()
  @ApiOperation({ summary: '유저 생성' })
  createUser(@Body() createUserDto: CreateUserDto) {
    return {
      ...this.generateUser(),
      ...createUserDto,
      message: 'User created successfully',
    };
  }

  @Put(':id')
  @ApiOperation({ summary: '유저 전체 수정' })
  @ApiParam({ name: 'id', type: Number })
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return {
      ...this.generateUser(Number(id)),
      ...updateUserDto,
      message: 'User updated successfully',
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: '유저 부분 수정' })
  @ApiParam({ name: 'id', type: Number })
  patchUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return {
      ...this.generateUser(Number(id)),
      ...updateUserDto,
      message: 'User patched successfully',
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: '유저 삭제' })
  @ApiParam({ name: 'id', type: Number })
  deleteUser(@Param('id') id: number) {
    return {
      id: Number(id),
      deleted: true,
      message: 'User deleted successfully',
    };
  }

  @Get(':id/profile')
  @ApiOperation({ summary: '유저 프로필 상세 조회', description: '중첩 객체와 배열을 포함한 상세 프로필' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: '프로필 조회 성공', type: UserProfileResponseDto })
  getUserProfile(@Param('id') id: number) {
    const firstName = randomItem(firstNames);
    const lastName = randomItem(lastNames);
    const interests = ['tech', 'music', 'travel', 'food', 'sports', 'art', 'gaming', 'reading'];
    const activityTypes = ['login', 'post_create', 'comment', 'like', 'follow', 'profile_update'];

    return {
      id: Number(id),
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      avatar: `https://i.pravatar.cc/150?u=${id}`,
      address: {
        street: `${randomInt(1, 999)} ${randomItem(lastNames)} Street`,
        city: randomItem(cities),
        country: randomItem(countries),
        zipCode: `${randomInt(10000, 99999)}`,
      },
      stats: {
        totalPosts: randomInt(0, 500),
        totalLikes: randomInt(0, 5000),
        followers: randomInt(0, 1000),
        following: randomInt(0, 500),
      },
      recentActivities: Array.from({ length: randomInt(3, 5) }, (_, i) => ({
        id: i + 1,
        type: randomItem(activityTypes),
        timestamp: new Date(Date.now() - randomInt(0, 7 * 24 * 60 * 60 * 1000)).toISOString(),
        ipAddress: `192.168.${randomInt(0, 255)}.${randomInt(1, 255)}`,
      })),
      interests: Array.from({ length: randomInt(2, 4) }, () => randomItem(interests)),
      createdAt: new Date(Date.now() - randomInt(0, 365 * 24 * 60 * 60 * 1000)).toISOString(),
    };
  }
}
