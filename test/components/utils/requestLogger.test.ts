import { Request, Response } from 'express';
import { RequestLogger } from '../../../src/components/utils/requestLogger';
import { Logger } from 'src/components/utils/logger';
import { Environment, LogLevel } from '../../../src/components/config/types';

describe('RequestLogger', () => {
	const logger = new Logger({ logLevel: LogLevel.log, environment: Environment.development });
	const requestLogger = new RequestLogger(logger);

	const req: Request = {
		method: 'GET',
		baseUrl: '/api',
		path: '/users',
		ip: '123.456.789.012',
	} as unknown as Request;
	const res: Response = {
		statusCode: 200,
		get: jest.fn(),
		on: (event: string, callback: () => unknown) => callback(),
	} as unknown as Response;
	const next = jest.fn();

	it('should log request details', () => {
		const debugSpy = jest.spyOn(logger, 'debug');
		req.get = jest.fn().mockReturnValue('My-User-Agent');
		res.get = jest.fn().mockReturnValue(128);

		requestLogger.use(req, res, next);

		expect(debugSpy).toHaveBeenCalledWith(
			'Request: ',
			`method: ${req.method}`,
			`path: ${req.baseUrl}${req.path}`,
			`statusCode: ${res.statusCode}`,
			`content-length: 128`,
			`user-agent: My-User-Agent`,
			`ip: 123.456.789.012`,
		);
	});

	it('should call next()', () => {
		requestLogger.use(req, res, next);

		expect(next).toHaveBeenCalled();
	});
});
