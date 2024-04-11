export class AsyncIterableIteratorWrapper<T> implements AsyncIterableIterator<T> {
	constructor(public readonly next: AsyncIterator<T, unknown, unknown>['next']) {}

	static done(): IteratorReturnResult<undefined> {
		return {
			done: true,
			value: undefined,
		};
	}

	static returnNext<TReturn>(value: TReturn): IteratorYieldResult<TReturn> {
		return {
			done: false,
			value,
		};
	}

	static transform<TIterm = undefined, TReturn = TIterm>(
		iterator: AsyncIterableIterator<TIterm>,
		transformFn: (...args: [TIterm]) => Promise<TReturn>,
	): AsyncIterableIteratorWrapper<TReturn> {
		return new AsyncIterableIteratorWrapper<TReturn>(async () => {
			const item = await iterator.next();

			if (!item) {
				return AsyncIterableIteratorWrapper.done();
			}

			if (item.done) {
				return AsyncIterableIteratorWrapper.done();
			}

			const transformedValue = await transformFn(item.value);
			return AsyncIterableIteratorWrapper.returnNext<TReturn>(transformedValue);
		});
	}

	[Symbol.asyncIterator](): AsyncIterableIterator<T> {
		return this;
	}
}
