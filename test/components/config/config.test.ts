import { Config } from 'src/components/config/config';

describe('Config', () => {
	const config = new Config();

	it('Should be defined', () => {
		expect(config).toBeDefined();
	});

	it('should have correct environment configuration', () => {
		expect(config.environment).toBe('development');
		expect(config.logLevel).toBe('info');
	});
});
