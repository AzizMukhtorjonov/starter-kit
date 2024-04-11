import { Injectable } from '@nestjs/common';
import { UserService } from '../../../architecture/service/main/user';
import { UserEntity } from '../../../domain/entities/main/user';
import { UserNotFound } from '../../../components/errors';

@Injectable()
export class UserUseCases {
	constructor(private readonly service: UserService) {}

	async getById(id: string): Promise<UserEntity> {
		const entity = await this.service.getById(id);
		if (!entity) throw new UserNotFound({ id });
		return entity;
	}
}
