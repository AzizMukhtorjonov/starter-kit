import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Logger } from './logger';

@Injectable()
export class RequestLogger implements NestMiddleware {
	constructor(private readonly logger: Logger) {}
	use(request: Request, response: Response, next: NextFunction): void {
		response.on('close', () => {
			this.logger.debug(
				'Request: ',
				`method: ${request.method}`,
				`path: ${request.baseUrl}${request.path}`,
				`statusCode: ${response.statusCode}`,
				`content-length: ${response.get('content-length')}`,
				`user-agent: ${request.get('user-agent')}`,
				`ip: ${request.ip}`,
			);
		});
		next();
	}
}
