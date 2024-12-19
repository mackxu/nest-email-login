import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User2 } from './entities/user2.entity';

@Injectable()
export class User2Service {
  @InjectEntityManager()
  private entityManager: EntityManager;

  async findUser2ByEmail(email: string) {
    return await this.entityManager.findOneBy(User2, { email });
  }
}
