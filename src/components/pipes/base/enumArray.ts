import { Injectable, ParseEnumPipe } from '@nestjs/common';
import { InvalidData } from '../../errors';

@Injectable()
export class EnumArrayValidationPipe<T> extends ParseEnumPipe {
	private readonly separator = ',';
	constructor(params: { enum: T }) {
		super(params.enum);
	}
	override async transform(value: string): Promise<T[] | undefined> {
		if (!value) return undefined;
		const array = value.split(this.separator);
		const enumValues = Object.values(this.enumType);
		for (const arrayValue of array) {
			if (!enumValues.includes(arrayValue)) throw new InvalidData({ data: arrayValue });
		}
		return array as T[];
	}
}
