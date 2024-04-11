import { ApiQueryOptions } from '@nestjs/swagger/dist/decorators/api-query.decorator';

export const ApiDecoratorQueryOffset: ApiQueryOptions = {
	name: 'offset',
	deprecated: false,
	required: true,
	type: Number,
	allowEmptyValue: false,
	description: 'Amount of elements to skip',
	isArray: false,
};

export const ApiDecoratorQueryLimit: ApiQueryOptions = {
	name: 'limit',
	deprecated: false,
	required: true,
	type: Number,
	allowEmptyValue: false,
	description: 'Amount of elements to get',
	isArray: false,
};
