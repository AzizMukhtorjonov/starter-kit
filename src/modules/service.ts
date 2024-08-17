import { Module } from '@nestjs/common';
import { UserService } from '../architecture/service/main/user';
import { RepositoryModule } from './repository';
import { Scheduler } from '../architecture/service/main/scheduler';
import { ConfigModule } from './config';
import { InfrastructureModule } from './infrastructure';

@Module({
	imports: [ConfigModule, InfrastructureModule, RepositoryModule],
	controllers: [],
	providers: [UserService, Scheduler],
	exports: [UserService],
})
export class ServiceModule {}
