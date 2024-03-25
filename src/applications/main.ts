import { NestFactory } from '@nestjs/core';
import { MainAppModule } from '../modules/main.application';
import { Config } from '../components/config/config';
import { Swagger } from '../components/utils/swagger';
import { Logger } from '../components/utils/logger';

async function start(): Promise<void> {
	const app = await NestFactory.create(MainAppModule, { logger: ['error', 'warn'] });
	const logger = app.get(Logger);
	app.setGlobalPrefix('api').useLogger(logger);
	const config = app.get(Config);

	await new Swagger(config).init(app);

	await app.init();

	logger.info(`Started to listening on ${config.servers.main.port}`);
	await app.listen(config.servers.main.port);
}

start();

async function stop(event: string): Promise<void> {
	console.log(`Incoming Signal: ${event}`);

	console.log('Application end');
	process.exit(0);
}

//catches ctrl+c event
process.on('SIGINT', stop.bind(null, 'SIGINT'));
process.on('SIGTERM', stop.bind(null, 'SIGTERM'));

process.on('unhandledRejection', (reason, promise) => {
	console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});
