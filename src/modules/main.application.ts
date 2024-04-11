import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RequestLogger } from '../components/utils/requestLogger';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorHandlerInterceptor } from '../components/interceptors/errorHandler';
import { ConfigModule } from './config';
import { LoggerInterceptor } from '../components/interceptors/logger';
import { SessionInterceptor } from '../components/interceptors/session';
import { InfrastructureModule } from './infrastructure';
import { FabricModule } from './fabric';
import { RepositoryModule } from './repository';
import { ServiceModule } from './service';

@Module({
	imports: [ConfigModule, InfrastructureModule, FabricModule, RepositoryModule, ServiceModule],
	controllers: [],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: SessionInterceptor,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: LoggerInterceptor,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: ErrorHandlerInterceptor,
		},
	],
})
export class MainAppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(RequestLogger).forRoutes('*');
	}
}
