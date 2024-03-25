import { Cache } from 'src/components/db/cache';

describe('Cache', () => {
	const defaultTtl = 10;
	const cache = new Cache(defaultTtl);

	afterAll(() => {
		jest.restoreAllMocks();
	});

	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it('should store and retrieve data', async () => {
		const key = 'testKey';
		const value = 'testValue';
		await cache.set(key, value);
		expect(await cache.get(key)).toBe(value);
	});

	it('should wait TTL and expire data', async () => {
		const key = 'testKey';
		const value = 'testValue';
		const ttl = 1;
		await cache.setWithTtlInMilliSeconds(key, value, ttl);
		jest.setSystemTime(Date.now() + ttl);
		jest.advanceTimersByTime(ttl);
		expect(await cache.get(key)).toBeUndefined();
	});

	it('should use default TTL if none is provided', async () => {
		const key = 'testKey';
		const value = 'testValue';
		await cache.setWithTtlInMilliSeconds(key, value);
		jest.setSystemTime(Date.now() + defaultTtl);
		jest.advanceTimersByTime(defaultTtl);
		expect(await cache.get(key)).toBeUndefined();
	});

	it('should not expire data if TTL is 0', async () => {
		const key = 'testKey';
		const value = 'testValue';
		await cache.setWithTtlInMilliSeconds(key, value, 0);
		const waitTime = 1000;
		jest.setSystemTime(Date.now() + waitTime);
		jest.advanceTimersByTime(waitTime);
		expect(await cache.get(key)).toBe(value);
	});

	it('should clear data after TTL', async () => {
		const key = 'testKey';
		const value = 'testValue';
		const ttl = 2;
		await cache.setWithTtlInMilliSeconds(key, value, ttl);
		jest.setSystemTime(Date.now() + ttl);
		jest.advanceTimersByTime(ttl);
		expect(await cache.get(key)).toBeUndefined();
	});

	it('should not clear data before TTL expires', async () => {
		const key = 'testKey';
		const value = 'testValue';
		const ttl = 3 * 1000;
		await cache.setWithTtlInMilliSeconds(key, value, ttl);
		jest.advanceTimersByTime(ttl - 1000);
		expect(await cache.get(key)).toBe(value);
	});
});
