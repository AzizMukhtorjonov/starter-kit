import { CallHandler, ExecutionContext, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { RequestContext } from './session';

export class LoggerInterceptor implements NestInterceptor {
	public intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> | Promise<Observable<unknown>> {
		const request = context.switchToHttp().getRequest<RequestContext>();
		const contextType = context.getType().toUpperCase();
		const statusCode = context.switchToHttp().getResponse().statusCode;

		Logger.log(
			`${request.method} ${request.baseUrl}${request.path} ${request.ip} ${request.session.id}`,
			contextType,
		);
		return next.handle().pipe(
			tap(() => {
				Logger.log(
					`${request.method} ${request.baseUrl}${request.path} ${statusCode} ${request.ip} ${
						request.session.id
					} - \x1b[33m+${Date.now() - request.session.startTime.getTime()}ms`,
					contextType,
				);
			}),
		);
	}
}
