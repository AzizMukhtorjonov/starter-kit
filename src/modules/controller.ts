import { Module } from '@nestjs/common';
import { UseCaseModule } from './useCase';
import { PresenterModule } from './presenter';
import { ApplicationController } from '../api/controllers/main/application';
import { UserController } from '../api/controllers/main/user';

@Module({
	imports: [UseCaseModule, PresenterModule],
	controllers: [ApplicationController, UserController],
	providers: [],
	exports: [],
})
export class ControllerModule {}
