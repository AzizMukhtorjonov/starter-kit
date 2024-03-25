import {
	DataNotDefined,
	EnvironmentNotDefined,
	ErrorCodes,
	InvalidData,
	UserNotFound,
	ValueIsGreater,
	ValueIsLower,
} from 'src/components/errors';

describe('Errors: ', () => {
	describe('User Not Found should return correct message: ', () => {
		it('default', () => {
			const error = new UserNotFound({ id: 1 });
			expect(error.message).toBe('User id: 1 not found');
			expect(error.code === ErrorCodes.UserNotFound);
		});
	});

	describe('Environment Not Defined should return correct message: ', () => {
		it('Env name - TestKey', () => {
			const error = new EnvironmentNotDefined({ env: 'TestKey' });
			expect(error.message).toBe('TestKey is not defined');
			expect(error.code === ErrorCodes.EnvironmentNotDefined);
		});
	});

	describe('Data Not Defined should return correct message: ', () => {
		it('Env name - TestKey', () => {
			const error = new DataNotDefined({ data: 'TestKey' });
			expect(error.message).toBe('TestKey is not defined');
			expect(error.code === ErrorCodes.DataNotDefined);
		});
	});

	describe('InvalidData should return correct message: ', () => {
		it('Data - Test data', () => {
			const error = new InvalidData({ data: 'Test Data' });
			expect(error.message).toBe('Test Data is invalid');
			expect(error.code === ErrorCodes.InvalidData);
		});
	});

	describe('Value Is Greater should return correct message: ', () => {
		it('Default, no params provided', () => {
			const error = new ValueIsGreater();
			expect(error.message).toBe('Value is greater than allowed');
			expect(error.code === ErrorCodes.ValueIsGreater);
		});
	});

	describe('Value Is Lower should return correct message: ', () => {
		it('Default, no params provided', () => {
			const error = new ValueIsLower();
			expect(error.message).toBe('Value is lower than allowed');
			expect(error.code === ErrorCodes.ValueIsLower);
		});
	});
});
