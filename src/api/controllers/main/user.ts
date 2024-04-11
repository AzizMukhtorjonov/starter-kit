import { Controller, Get, Param } from '@nestjs/common';
import { ApiEntities, ApiVersions } from '../types/enums';
import { ApiParam } from '@nestjs/swagger';
import { ApiDecoratorParamId } from '../types/apiDecorators/params';
import { IntValidationPipe } from '../../../components/pipes/base/number';
import { UserUseCases } from '../../useCases/main/user';
import { UserPresenters } from '../../presenters/main/user';
import { UserOutput } from '../../../domain/entities/main/user';

@Controller(`${ApiVersions.v1}/${ApiEntities.user}`)
export class UserController {
	constructor(
		private readonly useCases: UserUseCases,
		private readonly presenters: UserPresenters,
	) {}

	@Get(`/:id`)
	@ApiParam(ApiDecoratorParamId)
	async getOneByExternalIdAndSource(@Param('id', new IntValidationPipe({})) id: number): Promise<UserOutput> {
		const result = await this.useCases.getById(id.toString());
		return this.presenters.formatOne(result);
	}
}
