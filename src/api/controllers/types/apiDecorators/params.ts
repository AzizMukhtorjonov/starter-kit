import { ApiParamOptions } from '@nestjs/swagger/dist/decorators/api-param.decorator';

export const ApiDecoratorParamId: ApiParamOptions = {
	name: 'id',
	description: 'id of entity',
	required: true,
	type: 'number',
	format: 'integer',
	allowEmptyValue: false,
	deprecated: false,
};
