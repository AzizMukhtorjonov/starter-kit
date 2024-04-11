import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserEntity } from '../../../domain/entities/main/user';

@Injectable()
export class UserFabric {
	createFromModel(model: User): UserEntity {
		return new UserEntity({
			id: model.id.toString(),
			createTime: model.create_time,
			updateTime: model.update_time,

			email: model.email,
			firstName: model.first_name,
			lastName: model.last_name,
		});
	}
}
