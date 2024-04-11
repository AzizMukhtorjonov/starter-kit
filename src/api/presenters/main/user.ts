import { Injectable } from '@nestjs/common';
import { UserEntity, UserOutput } from '../../../domain/entities/main/user';

@Injectable()
export class UserPresenters {
	async formatOne(entity: UserEntity): Promise<UserOutput> {
		return entity.output();
	}
}
