import { sleep } from '../../../src/components/utils/functions';

beforeEach(() => {
	jest.useFakeTimers();
});

afterEach(() => {
	jest.useRealTimers();
});

test('sleep advances the timer without waiting', () => {
	const ms = 1000;
	const promise = sleep(ms);

	jest.advanceTimersByTime(ms);

	return expect(promise).resolves.toBeUndefined();
});
