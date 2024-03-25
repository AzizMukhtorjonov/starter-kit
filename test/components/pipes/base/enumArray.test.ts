import { EnumArrayValidationPipe } from 'src/components/pipes/base/enumArray';
import { InvalidData } from 'src/components/errors';
import { Language } from 'src/components/utils/types';

describe('EnumArrayValidationPipe', () => {
	const pipe = new EnumArrayValidationPipe({ enum: Language });

	it('Should return undefined if value is empty', async () => {
		await expect(pipe.transform('')).resolves.toBe(undefined);
	});

	it('Should return array of enum values if provided value satisfies enum', async () => {
		const testValue = `${Language.en},${Language.ru}`;
		const expectedResult = [Language.en, Language.ru];
		await expect(pipe.transform(testValue)).resolves.toEqual(expectedResult);
	});

	it('Throw error if any of the elements in value is not in an enum. Async throwing is not supported so this test is made on error equality', async () => {
		const testValue = `${Language.en},invalid,${Language.ru}`;
		await expect(pipe.transform(testValue)).rejects.toEqual(new InvalidData({ data: 'invalid' }));
	});
});
