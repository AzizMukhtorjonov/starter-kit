import { Module } from '@nestjs/common';
import { Db } from '../components/db';
import { Logger } from '../components/utils/logger';
import { PrismaService } from '../components/db/prisma';
import { ConfigModule } from './config';
import { Config } from '../components/config/config';

@Module({
	imports: [ConfigModule],
	controllers: [],
	providers: [
		PrismaService,
		Db,
		{
			provide: Logger,
			useFactory: (config: Config) => new Logger({ logLevel: config.logLevel, environment: config.environment }),
			inject: [Config],
		},
	],
	exports: [Db, Logger],
})
export class InfrastructureModule {}
