import { Module } from '@nestjs/common';
import { UserRepository } from '../architecture/repository/main/user';
import { InfrastructureModule } from './infrastructure';
import { FabricModule } from './fabric';

@Module({
	imports: [InfrastructureModule, FabricModule],
	controllers: [],
	providers: [UserRepository],
	exports: [UserRepository],
})
export class RepositoryModule {}
