import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private readonly redisClient: RedisClientType;

  async get(key: string) {
    return await this.redisClient.get(key);
  }

  async set(key: string, value: string | number, seconds?: number) {
    if (seconds) {
      await this.redisClient.set(key, value, { EX: seconds });
    } else {
      await this.redisClient.set(key, value);
    }
  }
}