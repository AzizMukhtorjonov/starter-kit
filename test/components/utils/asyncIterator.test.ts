import { AsyncIterableIteratorWrapper } from 'src/components/utils/asyncIterator';

describe('AsyncIterableIteratorWrapper', () => {
	it('should create an instance with a next function', async () => {
		const nextFn = jest.fn().mockResolvedValue({ done: true, value: undefined });
		const wrapper = new AsyncIterableIteratorWrapper(nextFn);
		expect(wrapper).toBeInstanceOf(AsyncIterableIteratorWrapper);
		await wrapper.next();
		expect(nextFn).toHaveBeenCalled();
	});

	it('done should return an object with done true and value undefined', () => {
		const result = AsyncIterableIteratorWrapper.done();
		expect(result).toEqual({ done: true, value: undefined });
	});

	it('returnNext should return an object with done false and a value', () => {
		const testValue = 'test';
		const result = AsyncIterableIteratorWrapper.returnNext(testValue);
		expect(result).toEqual({ done: false, value: testValue });
	});

	it('transform should apply a transform function to the iterator values', async () => {
		const mockIterator: AsyncIterableIterator<number> = {
			next: jest.fn().mockResolvedValueOnce({ done: false, value: 1 }).mockResolvedValueOnce({ done: true }),
			[Symbol.asyncIterator]() {
				return this;
			},
		};
		const transformFn = jest.fn((value) => Promise.resolve(value * 2));
		const transformed = AsyncIterableIteratorWrapper.transform(mockIterator, transformFn);

		await transformed.next();
		expect(transformFn).toHaveBeenCalledWith(1);
		const result = await transformed.next();
		expect(result).toEqual({ done: true, value: undefined });
	});
});
