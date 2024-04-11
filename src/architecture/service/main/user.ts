import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repository/main/user';
import { UserEntity } from '../../../domain/entities/main/user';

@Injectable()
export class UserService {
	constructor(private readonly repository: UserRepository) {}

	async getById(id: string): Promise<UserEntity | undefined> {
		return await this.repository.getById(id);
	}
}
