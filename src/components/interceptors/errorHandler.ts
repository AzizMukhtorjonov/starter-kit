import {
	CallHandler,
	Catch,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
	NestInterceptor,
	Scope,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { Config } from '../config/config';
import { RequestContext } from './session';
import { Environment } from '../config/types';
import { BaseExceptionFilter } from '@nestjs/core';
import { Logger } from '../utils/logger';

@Injectable({ scope: Scope.REQUEST })
@Catch()
export class ErrorHandlerInterceptor extends BaseExceptionFilter implements NestInterceptor {
	constructor(
		private readonly config: Config,
		private readonly logger: Logger,
	) {
		super();
	}
	public intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> | Promise<Observable<unknown>> {
		const request = context.switchToHttp().getRequest<RequestContext>();

		return next.handle().pipe(
			catchError((error) => {
				return throwError(() => {
					this.logger.error(
						`${request.method} ${request.baseUrl}${request.path} ${request.ip} ${
							request.session.id
						} failed after \x1b[33m+${Date.now() - request.session.startTime.getTime()}ms`,
						context.getType().toUpperCase(),
					);
					if (error instanceof HttpException) {
						return error;
					}
					this.logger.error(error.stack);
					return new HttpException(
						this.config.environment === Environment.production ? error.message : error.stack,
						HttpStatus.BAD_REQUEST,
						{
							cause: error,
						},
					);
				});
			}),
		);
	}
}
