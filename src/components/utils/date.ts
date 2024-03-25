export enum DateFormat {
	YYYYMMDDHHmmss = 'YYYYMMDDHHmmss',
}

export class CustomDate {
	private readonly time: Date;
	constructor() {
		this.time = new Date();
	}

	format(format: DateFormat): string {
		const { year, month, date, hour, minute, second, ms, offset } = this.getData();
		switch (format) {
			default:
				return `${year}-${month}-${date} ${hour}:${minute}:${second}.${ms}${offset ? ` ${offset}` : ''}`;
		}
	}

	private getData(): {
		year: string;
		month: string;
		date: string;
		hour: string;
		minute: string;
		second: string;
		ms: string;
		offset: string;
	} {
		const year = this.time.getFullYear().toString();

		const monthNotFormatted = this.time.getMonth() + 1;
		const month = `${'0'.repeat(2 - monthNotFormatted.toString().length)}${monthNotFormatted}`;

		const dateNotFormatted = this.time.getDate();
		const date = `${'0'.repeat(2 - dateNotFormatted.toString().length)}${dateNotFormatted}`;

		const hourNotFormatted = this.time.getHours();
		const hour = `${'0'.repeat(2 - hourNotFormatted.toString().length)}${hourNotFormatted}`;

		const minuteNotFormatted = this.time.getMinutes();
		const minute = `${'0'.repeat(2 - minuteNotFormatted.toString().length)}${minuteNotFormatted}`;

		const secondNotFormatted = this.time.getSeconds();
		const second = `${'0'.repeat(2 - secondNotFormatted.toString().length)}${secondNotFormatted}`;

		const msNotFormatted = this.time.getMilliseconds();
		const ms = `${'0'.repeat(3 - msNotFormatted.toString().length)}${msNotFormatted}`;

		const offsetNotFormatted = (this.time.getTimezoneOffset() / 60) * 100;

		const offset =
			offsetNotFormatted === 0 ? '' : `${offsetNotFormatted > 0 ? '+' : '-'}0${Math.abs(offsetNotFormatted)}`;

		return { year, month, date, hour, minute, second, ms, offset };
	}
}
