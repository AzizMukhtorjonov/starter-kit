import { Environment, LogLevel } from '../../../src/components/config/types';
import { CustomDate, DateFormat } from '../../../src/components/utils/date';
import { Logger } from '../../../src/components/utils/logger';

describe('Logger', () => {
	let logger: Logger;
	let dateNowSpy: jest.SpyInstance;

	beforeEach(() => {
		const now = new Date();
		dateNowSpy = jest.spyOn(global, 'Date').mockImplementation(() => now);
		logger = new Logger({ logLevel: LogLevel.debug, environment: Environment.development });
	});

	afterEach(() => {
		dateNowSpy.mockRestore();
	});

	describe('log()', () => {
		it('should log a message with time if log level is log', () => {
			const consoleLogSpy = jest.spyOn(console, 'log');
			logger = new Logger({ logLevel: LogLevel.log, environment: Environment.development });
			logger.log('Test message');
			expect(consoleLogSpy).toHaveBeenCalledWith(
				`${new CustomDate().format(DateFormat.YYYYMMDDHHmmss)} -> Test message`,
			);
			consoleLogSpy.mockRestore();
		});

		it('should not log a message if log level is debug and message is not debug', () => {
			const consoleLogSpy = jest.spyOn(console, 'log');
			logger.log('Test message');
			expect(consoleLogSpy).not.toHaveBeenCalled();
			consoleLogSpy.mockRestore();
		});
	});

	describe('debug()', () => {
		it('should log a message with time if log level is debug', () => {
			const consoleDebugSpy = jest.spyOn(console, 'debug');
			logger.debug('Test message');
			expect(consoleDebugSpy).toHaveBeenCalledWith(
				`${new CustomDate().format(DateFormat.YYYYMMDDHHmmss)} -> Test message`,
			);
			consoleDebugSpy.mockRestore();
		});

		it('should not log a message if log level is warn and message is not warn', () => {
			const consoleDebugSpy = jest.spyOn(console, 'debug');
			logger = new Logger({ logLevel: LogLevel.warn, environment: Environment.development });
			logger.debug('Test message');
			expect(consoleDebugSpy).not.toHaveBeenCalled();
			consoleDebugSpy.mockRestore();
		});
	});

	describe('info()', () => {
		it('should log a message with time if log level is info', () => {
			const consoleInfoSpy = jest.spyOn(console, 'info');
			logger = new Logger({ logLevel: LogLevel.info, environment: Environment.development });
			logger.info('Test message');
			expect(consoleInfoSpy).toHaveBeenCalledWith(
				`${new CustomDate().format(DateFormat.YYYYMMDDHHmmss)} -> Test message`,
			);
			consoleInfoSpy.mockRestore();
		});

		it('should not log a message if log level is error and message is not error', () => {
			const consoleInfoSpy = jest.spyOn(console, 'info');
			logger = new Logger({ logLevel: LogLevel.error, environment: Environment.development });
			logger.info('Test message');
			expect(consoleInfoSpy).not.toHaveBeenCalled();
			consoleInfoSpy.mockRestore();
		});
	});

	describe('warn()', () => {
		it('should log a message with time if log level is warn', () => {
			const consoleWarnSpy = jest.spyOn(console, 'warn');
			logger.warn('Test message');
			expect(consoleWarnSpy).toHaveBeenCalledWith(
				`${new CustomDate().format(DateFormat.YYYYMMDDHHmmss)} -> Test message`,
			);
			consoleWarnSpy.mockRestore();
		});

		it('should not log a message if log level is error and message is not error', () => {
			const consoleWarnSpy = jest.spyOn(console, 'warn');
			logger = new Logger({ logLevel: LogLevel.error, environment: Environment.development });
			logger.warn('Test message');
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			consoleWarnSpy.mockRestore();
		});
	});

	describe('error()', () => {
		it('should log a message with time if log level is error', () => {
			const consoleErrorSpy = jest.spyOn(console, 'error');
			logger.error('Test message');
			expect(consoleErrorSpy).toHaveBeenCalledWith(
				`${new CustomDate().format(DateFormat.YYYYMMDDHHmmss)} -> Test message`,
			);
			consoleErrorSpy.mockRestore();
		});

		it('should not log a message if log level is not error', () => {
			const consoleErrorSpy = jest.spyOn(console, 'error');
			logger = new Logger({ logLevel: LogLevel.warn, environment: Environment.development });
			logger.error('Test message');
			expect(consoleErrorSpy).toHaveBeenCalledWith(
				`${new CustomDate().format(DateFormat.YYYYMMDDHHmmss)} -> Test message`,
			);
			consoleErrorSpy.mockRestore();
		});
	});
});
