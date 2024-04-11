import { Injectable } from '@nestjs/common';
import { Config } from '../../../components/config/config';

@Injectable()
export class ApplicationUseCases {
	constructor(private readonly config: Config) {}

	async health(): Promise<{ status: string; app_name: string; start_time: Date; current_time: Date }> {
		return {
			status: 'running',
			app_name: this.config.app.name,
			start_time: this.config.app.startTime,
			current_time: new Date(),
		};
	}
}
