import { EnumValidationPipe } from 'src/components/pipes/base/enum';
import { InvalidData } from 'src/components/errors';
import { Language } from '../../../../src/components/utils/types';

describe('EnumValidationPipe', () => {
	const pipe = new EnumValidationPipe({ enum: Language });

	it('Should return undefined if given value is empty', async () => {
		await expect(pipe.transform('')).resolves.toBeUndefined();
	});

	it('Should return the value if its in enum', async () => {
		await expect(pipe.transform(Language.en)).resolves.toBe(Language.en);
	});

	it('Should throw error if value is not in enum. Async throwing is not supported so this test is made on error equality', async () => {
		await expect(pipe.transform('invalid')).rejects.toEqual(new InvalidData({ data: 'invalid' }));
	});
});
