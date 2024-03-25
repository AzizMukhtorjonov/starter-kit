import { Language } from '../utils/types';
import { HttpException } from '@nestjs/common';

export enum ErrorCodes {
	UserNotFound = -40499,

	EnvironmentNotDefined = -40100,
	DataNotDefined = -40099,
	InvalidData,

	ValueIsGreater = -50999,
	ValueIsLower,
}

abstract class BaseError {
	protected constructor(
		readonly message: string,
		readonly code: ErrorCodes,
		readonly externalError?: any,
	) {}
}
abstract class NotFoundHttpException extends HttpException {
	protected constructor(
		readonly message: string,
		readonly code: ErrorCodes,
	) {
		super(message, 204);
	}
}

export class UserNotFound extends NotFoundHttpException {
	constructor(params: { id: number | undefined; lang?: Language }) {
		const msg = {
			en: `User id: ${params.id} not found`,
			ru: `User id: ${params.id} not found in russian`,
		};
		super(msg[params.lang ?? Language.en], ErrorCodes.UserNotFound);
	}
}

export class EnvironmentNotDefined extends BaseError {
	constructor(params: { env: string; lang?: Language }) {
		const msg = {
			en: `${params.env} is not defined`,
			ru: `${params.env} is not defined in russian`,
		};
		super(msg[params?.lang ?? Language.en], ErrorCodes.EnvironmentNotDefined);
	}
}

export class DataNotDefined extends BaseError {
	constructor(private readonly params: { data?: string; lang?: Language }) {
		const msg = {
			en: `${params.data} is not defined`,
			ru: `${params.data} is not defined in russian`,
		};
		super(msg[params.lang ?? Language.en], ErrorCodes.DataNotDefined);
	}
}

export class InvalidData extends BaseError {
	constructor(params: { data: string }) {
		const msg = `${params.data} is invalid`;
		super(msg, ErrorCodes.InvalidData);
	}
}

export class ValueIsGreater extends BaseError {
	constructor() {
		const msg = `Value is greater than allowed`;
		super(msg, ErrorCodes.ValueIsGreater);
	}
}
export class ValueIsLower extends BaseError {
	constructor() {
		const msg = `Value is lower than allowed`;
		super(msg, ErrorCodes.ValueIsLower);
	}
}
