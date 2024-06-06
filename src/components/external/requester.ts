import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Injectable } from '@nestjs/common';
import { Logger } from '../utils/logger';
import { LogLevel } from '../config/types';

@Injectable()
export class Requester {
	private readonly client: AxiosInstance;
	private readonly logger = new Logger({ logLevel: LogLevel.info });
	constructor() {
		this.client = axios.create();
	}

	async get<R>(url: string, options?: AxiosRequestConfig): Promise<R> {
		try {
			const response = await this.client.get<R>(url, options);
			return response.data;
		} catch (e) {
			this.logger.error('Error in Requester.get: ', e);
			throw e;
		}
	}
	async post<R>(url: string, body: Record<string, any>, options?: AxiosRequestConfig): Promise<R> {
		try {
			const response = await this.client.post<R>(url, body, options);
			return response.data;
		} catch (e) {
			this.logger.error('Error in Requester.post: ', e);
			throw e;
		}
	}
}
