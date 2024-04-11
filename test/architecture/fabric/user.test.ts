import { User } from '@prisma/client';
import { UserFabric } from '../../../src/architecture/fabric/main/user';
import { UserEntity } from '../../../src/domain/entities/main/user';

describe('UserFabric', () => {
	let userFabric: UserFabric;

	beforeEach(() => {
		userFabric = new UserFabric();
	});

	it('should create a UserEntity from a User model', () => {
		const model: User = {
			id: 1,
			create_time: new Date(),
			update_time: new Date(),
			email: 'test@example.com',
			first_name: 'John',
			last_name: 'Doe',
		};

		const userEntity = userFabric.createFromModel(model);

		expect(userEntity).toBeInstanceOf(UserEntity);
		expect(userEntity.id).toEqual(model.id.toString());
		expect(userEntity.createTime).toEqual(model.create_time);
		expect(userEntity.updateTime).toEqual(model.update_time);
		expect(userEntity.email).toEqual(model.email);
		expect(userEntity.firstName).toEqual(model.first_name);
		expect(userEntity.lastName).toEqual(model.last_name);
	});
});
