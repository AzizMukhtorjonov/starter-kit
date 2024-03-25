import { ArgumentMetadata, Injectable, ParseIntPipe } from '@nestjs/common';
import { ValueIsGreater, ValueIsLower } from '../../errors';

@Injectable()
export class IntValidationPipe extends ParseIntPipe {
	constructor(private readonly params: { min?: number; max?: number; default?: number }) {
		super();
	}
	override async transform(value: any, metadata: ArgumentMetadata): Promise<number> {
		if (value === undefined && this.params.default) return this.params.default;

		const transformedValue = await super.transform(value, metadata);
		if (this.params.min && this.params.min >= transformedValue) throw new ValueIsLower();
		if (this.params.max && this.params.max <= transformedValue) throw new ValueIsGreater();
		return transformedValue;
	}
}
