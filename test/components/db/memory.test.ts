import { Memory } from 'src/components/db/memory';

describe('Memory', () => {
	const memory = new Memory();
	const testKey = 'testKey';
	const testData = { some: 'data' };
	const testTtl = 5000;

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('get should retrieve data by key', async () => {
		const spy = jest.spyOn(memory, 'get').mockResolvedValue(testData);
		const data = await memory.get(testKey);
		expect(spy).toHaveBeenCalledWith(testKey);
		expect(data).toEqual(testData);
	});

	test('set should save data with a key', async () => {
		const spy = jest.spyOn(memory, 'set').mockResolvedValue(undefined);
		await memory.set(testKey, testData);
		expect(spy).toHaveBeenCalledWith(testKey, testData);
	});

	test('setWithTtlInMilliSeconds should save data with a key and custom TTL', async () => {
		const spy = jest.spyOn(memory, 'setWithTtlInMilliSeconds').mockResolvedValue(undefined);
		await memory.setWithTtlInMilliSeconds(testKey, testData, testTtl);
		expect(spy).toHaveBeenCalledWith(testKey, testData, testTtl);
	});

	test('setWithTtlInMilliSeconds should save data with a key and default TTL if not provided', async () => {
		const spy = jest.spyOn(memory, 'setWithTtlInMilliSeconds').mockResolvedValue(undefined);
		await memory.setWithTtlInMilliSeconds(testKey, testData);
		expect(spy).toHaveBeenCalledWith(testKey, testData);
	});
});
