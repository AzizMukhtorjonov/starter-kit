import { Injectable, ParseEnumPipe } from '@nestjs/common';
import { InvalidData } from '../../errors';

@Injectable()
export class EnumValidationPipe<T> extends ParseEnumPipe {
	constructor(params: { enum: T }) {
		super(params.enum);
	}
	override async transform(value: string): Promise<T | undefined> {
		if (!value) return undefined;
		if (Object.values(this.enumType).includes(value)) return value as T;
		throw new InvalidData({ data: value });
	}
}
