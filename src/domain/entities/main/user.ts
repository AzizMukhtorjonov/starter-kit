import { BaseEntity, BaseEntityParams } from '../base';
import { User } from '@prisma/client';

export type UserOutput = Pick<User, 'first_name' | 'last_name' | 'email'> & { id: string };

export class UserEntity extends BaseEntity {
	private readonly _firstName: string;
	private readonly _lastName: string;
	private readonly _email: string;
	constructor(params: BaseEntityParams & { firstName: string; lastName: string; email: string }) {
		super(params);
		this._firstName = params.firstName;
		this._lastName = params.lastName;
		this._email = params.email;
	}

	get firstName(): string {
		return this._firstName;
	}
	get lastName(): string {
		return this._lastName;
	}
	get email(): string {
		return this._email;
	}

	output(): UserOutput {
		return {
			id: this.id,
			first_name: this.firstName,
			last_name: this.lastName,
			email: this.email,
		};
	}
}
