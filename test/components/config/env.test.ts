import { Env } from 'src/components/config/env';
import { EnvironmentNotDefined } from 'src/components/errors';

describe('Env', () => {
	it('Use .env if other env_file is not provided', () => {
		const originalEnv = process.env;
		process.env = {};
		const env = new Env();
		expect(env.get('MAIN_APP_HOST')).toBe('localhost');
		process.env = originalEnv;
	});

	const env = new Env();

	it('should return the value of an environment variable', () => {
		expect(env.get('MAIN_APP_HOST')).toBe('localhost');
	});

	it('should return undefined for an undefined environment variable', () => {
		expect(env.get('LOG_LEVEL')).toBeUndefined();
	});

	it('should return the value of an environment variable', () => {
		expect(env.getOrThrow('MAIN_APP_PORT')).toBe('1512');
	});

	it('should throw an error if the environment variable is not defined', () => {
		expect(() => env.getOrThrow('LOG_LEVEL')).toThrow(EnvironmentNotDefined);
	});
});
