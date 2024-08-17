import { Injectable, OnModuleInit } from '@nestjs/common';
import { Config } from 'src/components/config/config';
import { Logger } from '../../../components/utils/logger';

@Injectable()
export class Scheduler implements OnModuleInit {
	constructor(
		private readonly config: Config,
		private readonly logger: Logger,
	) {}

	async onModuleInit(): Promise<void> {
		setTimeout(this.job.bind(this), this.getMsUntilNextHour());
	}

	private async job(): Promise<void> {
		this.logger.info('Scheduler job');
	}

	private getMsUntilNextHour(): number {
		const now = new Date();
		const nextHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1);
		return nextHour.getTime() - now.getTime();
	}
}
