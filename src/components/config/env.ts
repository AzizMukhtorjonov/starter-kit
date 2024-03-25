import { config } from 'dotenv';
import * as process from 'process';
import { EnvironmentNotDefined } from '../errors';
import { DotEnv } from './types';

export class Env {
	private readonly _env: DotEnv;

	constructor() {
		const pathToFile = process.env.env_file || '.env';
		config({ path: pathToFile });
		this._env = process.env as DotEnv & Record<string, string>;
	}

	get(value: keyof DotEnv): string | undefined {
		return this._env[value];
	}

	getOrThrow(value: keyof DotEnv): string {
		const result = this.get(value);
		if (!result) throw new EnvironmentNotDefined({ env: value });
		return result;
	}
}
