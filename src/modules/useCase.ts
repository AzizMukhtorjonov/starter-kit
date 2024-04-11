import { Module } from '@nestjs/common';
import { ApplicationUseCases } from '../api/useCases/main/application';
import { UserUseCases } from '../api/useCases/main/user';
import { ServiceModule } from './service';
import { ConfigModule } from './config';

@Module({
	imports: [ConfigModule, ServiceModule],
	controllers: [],
	providers: [ApplicationUseCases, UserUseCases],
	exports: [ApplicationUseCases, UserUseCases],
})
export class UseCaseModule {}
