import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { randomUUID } from 'crypto';

export type RequestContext = {
	ip: string;
	method: string;
	path: string;
	baseUrl: string;
	session: {
		startTime: Date;
		id: string;
	};
};

export class SessionInterceptor implements NestInterceptor {
	public intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> | Promise<Observable<unknown>> {
		context.switchToHttp().getRequest<RequestContext>().session = {
			startTime: new Date(),
			id: randomUUID(),
		};

		return next.handle();
	}
}
