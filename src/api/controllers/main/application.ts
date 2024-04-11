import { Controller, Get } from '@nestjs/common';
import { ApiEntities, ApiVersions } from '../types/enums';
import { ApplicationUseCases } from '../../useCases/main/application';

@Controller(`${ApiVersions.v1}/${ApiEntities.application}`)
export class ApplicationController {
	constructor(private readonly useCases: ApplicationUseCases) {}

	@Get(`/health`)
	async getOneByExternalIdAndSource(): ReturnType<ApplicationUseCases['health']> {
		return this.useCases.health();
	}
}
