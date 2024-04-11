import { AsyncIterableIteratorWrapper } from '../../components/utils/asyncIterator';

type SqlCursorOptions<CursorInput> = {
	cursor: CursorInput;
};

type SqlCursorResult<E> = {
	entities: E[];
};

export class Cursor<Type extends Record<string, any>, CursorInput> extends AsyncIterableIteratorWrapper<Type> {
	private buffer: SqlCursorResult<Type>;

	constructor(
		options: SqlCursorOptions<CursorInput>,
		requestFunc: (params: SqlCursorOptions<CursorInput>) => Promise<Type[]>,
	) {
		super(async () => {
			if (!this.buffer.entities.length) {
				this.buffer.entities = await requestFunc({ cursor: options.cursor });
			}

			const entity = this.buffer.entities.shift();

			if (!entity) {
				return AsyncIterableIteratorWrapper.done();
			}

			this.updateCursorPosition(options.cursor, entity);

			return AsyncIterableIteratorWrapper.returnNext<Type>(entity);
		});
		this.buffer = { entities: [] };
	}

	private updateCursorPosition(cursor: CursorInput, entity: Type): void {
		for (const key in cursor) cursor[key] = entity[key] as any;
	}
}
