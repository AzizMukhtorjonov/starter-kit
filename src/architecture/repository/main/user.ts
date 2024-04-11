import { Injectable } from '@nestjs/common';
import { Db } from '../../../components/db';
import { UserEntity } from '../../../domain/entities/main/user';
import { User } from '@prisma/client';
import { UserFabric } from '../../fabric/main/user';

@Injectable()
export class UserRepository {
	constructor(
		private readonly db: Db,
		private readonly fabric: UserFabric,
	) {}

	async getById(id: string): Promise<UserEntity | undefined> {
		const model = await this.db.main.user.findUnique({ where: { id: parseInt(id) } });
		return model ? await this.getSingleEntity(model) : undefined;
	}

	private async getSingleEntity(model: User): Promise<UserEntity> {
		return this.fabric.createFromModel(model);
	}
}
