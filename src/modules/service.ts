import { Module } from '@nestjs/common';
import { UserService } from '../architecture/service/main/user';
import { RepositoryModule } from './repository';

@Module({
	imports: [RepositoryModule],
	controllers: [],
	providers: [UserService],
	exports: [UserService],
})
export class ServiceModule {}
