import { Module } from '@nestjs/common';
import { UserFabric } from '../architecture/fabric/main/user';

@Module({
	imports: [],
	controllers: [],
	providers: [UserFabric],
	exports: [UserFabric],
})
export class FabricModule {}
