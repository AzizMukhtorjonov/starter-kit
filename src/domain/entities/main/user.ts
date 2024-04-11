import { BaseEntity, BaseEntityParams } from '../base';

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
}
