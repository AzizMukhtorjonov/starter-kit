import { Injectable } from '@nestjs/common';
import { DbConfig, Environment, LogLevel, ServersConfig } from './types';
import { Env } from './env';

@Injectable()
export class Config {
	readonly app = {
		name: 'starter-kit',
		startTime: new Date(),
		version: '1.0.0',
	};
	readonly db: DbConfig;
	readonly environment: Environment;
	readonly logLevel: LogLevel;
	readonly servers: ServersConfig;

	constructor() {
		const env = new Env();

		this.app.version = env.get('npm_package_version') ?? this.app.version;

		this.db = {
			url: env.getOrThrow('DATABASE_URL'),
		};
		const environment = env.get('ENVIRONMENT');
		this.environment =
			environment === Environment.development
				? Environment.development
				: environment === Environment.testing
					? Environment.testing
					: Environment.production;
		const logLevel = env.get('LOG_LEVEL');
		this.logLevel =
			logLevel === LogLevel.log
				? LogLevel.log
				: logLevel === LogLevel.debug
					? LogLevel.debug
					: logLevel === LogLevel.error
						? LogLevel.error
						: LogLevel.info;

		this.servers = {
			main: {
				host: env.getOrThrow('MAIN_APP_HOST'),
				port: parseInt(env.getOrThrow('MAIN_APP_PORT')),
			},
		};
	}
}
