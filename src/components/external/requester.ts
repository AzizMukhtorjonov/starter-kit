import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Requester {
	private readonly client: AxiosInstance;
	constructor() {
		this.client = axios.create();
	}

	async get<R>(url: string, options?: AxiosRequestConfig): Promise<R | undefined> {
		try {
			const response = await this.client.get<R>(url, options);
			return response.data;
		} catch (e) {
			return;
		}
	}
	async post<R>(url: string, body: Record<string, any>, options?: AxiosRequestConfig): Promise<R | undefined> {
		try {
			const response = await this.client.post<R>(url, body, options);
			return response.data;
		} catch (e) {
			return;
		}
	}
}
