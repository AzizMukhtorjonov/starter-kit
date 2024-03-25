import { MemoryClient } from './memory';

type MapCachedParams<Data = unknown> = {
	create_time: Date;
	data: Data;
	expire_after: Date | undefined;
};
export class Cache<Data> implements MemoryClient<Data> {
	private readonly map: Map<string, MapCachedParams>;
	constructor(private readonly defaultTtl: number) {
		this.map = new Map<string, MapCachedParams>();
	}

	async set<Data = unknown>(key: string, data: Data): Promise<void> {
		this.map.set(key, {
			create_time: new Date(),
			data,
			expire_after: undefined,
		});
	}
	async setWithTtlInMilliSeconds<Data = unknown>(key: string, data: Data, ttl = this.defaultTtl): Promise<void> {
		const now = new Date();
		this.map.set(key, {
			create_time: now,
			data,
			expire_after: new Date(now.getTime() + ttl),
		});

		if (ttl !== 0) setTimeout(this.clearAfterTtl.bind(this), ttl, key);
	}

	async get<Data = unknown>(key: string): Promise<Data | undefined> {
		const result = this.map.get(key);
		return result ? (result.data as Data) : undefined;
	}

	private clearAfterTtl(key: string): void {
		const data = this.map.get(key);
		if (!data || !data.expire_after) return;

		if (Date.now() > data.expire_after.getTime()) this.map.delete(key);
	}
}
