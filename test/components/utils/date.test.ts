import { CustomDate, DateFormat } from '../../../src/components/utils/date';

describe('CustomDate', () => {
	let customDate: CustomDate;

	beforeEach(() => {
		jest.useFakeTimers().setSystemTime(new Date('2024-03-26T04:36:00Z'));
		customDate = new CustomDate();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it('should format date correctly in YYYYMMDDHHmmss format', () => {
		const formattedDate = customDate.format(DateFormat.YYYYMMDDHHmmss);
		expect(formattedDate).toBe('2024-03-26 09:36:00.000 -0500');
	});
});
