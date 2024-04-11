import { Injectable } from '@nestjs/common';
import { Environment, LogLevel } from '../config/types';
import { LoggerService } from '@nestjs/common/services/logger.service';
import { CustomDate, DateFormat } from './date';

@Injectable()
export class Logger implements LoggerService {
	private readonly logger: typeof console;
	constructor(private readonly config: { logLevel: LogLevel; environment?: Environment }) {
		this.logger = console;
	}

	log(message: string, ...args: any[]): void {
		if (this.isEnabled(LogLevel.log)) this.print(this.logger.log, message, args);
	}
	debug(message: string, ...args: any[]): void {
		if (this.isEnabled(LogLevel.debug)) this.print(this.logger.debug, message, args);
	}

	info(message: string, ...args: any[]): void {
		if (this.isEnabled(LogLevel.info)) this.print(this.logger.info, message, args);
	}
	warn(message: string, ...args: any[]): void {
		if (this.isEnabled(LogLevel.warn)) this.print(this.logger.warn, message, args);
	}

	error(message: string, ...args: any[]): void {
		if (this.isEnabled(LogLevel.error)) this.print(this.logger.error, message, args);
	}

	private print(func: (...data: any[]) => void, message: string, args: any[]): void {
		const time =
			this.config?.environment === Environment.development
				? `${new CustomDate().format(DateFormat.YYYYMMDDHHmmss)} -> `
				: '';
		if (args.length) func(`${time}${message}`, args);
		else func(`${time}${message}`);
	}

	private isEnabled(logLevel: LogLevel): boolean {
		switch (this.config?.logLevel) {
			case LogLevel.log:
				return true;
			case LogLevel.debug:
				return [LogLevel.debug, LogLevel.warn, LogLevel.info, LogLevel.error].includes(logLevel);
			case LogLevel.warn:
				return [LogLevel.warn, LogLevel.info, LogLevel.error].includes(logLevel);
			case LogLevel.info:
				return [LogLevel.info, LogLevel.error].includes(logLevel);
			case LogLevel.error:
				return LogLevel.error === logLevel;
		}
	}
}
