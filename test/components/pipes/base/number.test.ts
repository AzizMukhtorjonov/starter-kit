import { ArgumentMetadata } from '@nestjs/common';
import { IntValidationPipe } from 'src/components/pipes/base/number';
import { ValueIsGreater, ValueIsLower } from 'src/components/errors';

describe('IntValidationPipe', () => {
	const pipe = new IntValidationPipe({ min: 1, max: 100, default: 50 });
	const metadata: ArgumentMetadata = { data: '20', type: 'body' };

	it('Should return 50 as default if value is not provided ', async () => {
		await expect(pipe.transform(undefined, metadata)).resolves.toBe(50);
	});

	it('Should return 20 as value if 20 is provided', async () => {
		await expect(pipe.transform('20', metadata)).resolves.toBe(20);
	});

	it('Should return ValueIsLower if given value is lower than minimum', async () => {
		await expect(pipe.transform('0', metadata)).rejects.toEqual(new ValueIsLower());
	});

	it('Should return ValueIsGreater if given value is greater than maximum', async () => {
		await expect(pipe.transform('101', metadata)).rejects.toEqual(new ValueIsGreater());
	});
});
