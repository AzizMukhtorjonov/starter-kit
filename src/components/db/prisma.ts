import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Config } from '../config/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	constructor(private readonly config: Config) {
		super({
			log: ['error', 'info', 'warn'],
			errorFormat: 'pretty',
			datasources: {
				db: {
					url: config.db.url,
				},
			},
		});
	}

	async onModuleInit(): Promise<void> {
		await super.$connect();
	}

	async onModuleDestroy(): Promise<void> {
		await super.$disconnect();
	}
}
