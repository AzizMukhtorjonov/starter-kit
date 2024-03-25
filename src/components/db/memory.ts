import { Injectable } from '@nestjs/common';
import { Cache } from './cache';

export interface MemoryClient<Data> {
	get(key: string): Promise<Data | undefined>;
	set(key: string, data: Data): Promise<void>;
	setWithTtlInMilliSeconds(key: string, data: Data, ttl: number): Promise<void>;
}

@Injectable()
export class Memory<Data> implements MemoryClient<Data> {
	private readonly ttl: number;
	private readonly client: MemoryClient<Data>;
	constructor() {
		this.ttl = 10 * 1000;
		this.client = new Cache<Data>(this.ttl);
	}

	async get(key: string): Promise<Data | undefined> {
		return await this.client.get(key);
	}

	async set(key: string, data: Data): Promise<void> {
		return await this.client.set(key, data);
	}

	async setWithTtlInMilliSeconds(key: string, data: Data, ttl = this.ttl): Promise<void> {
		return await this.client.setWithTtlInMilliSeconds(key, data, ttl);
	}
}
