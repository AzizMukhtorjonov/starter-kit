import { Module } from '@nestjs/common';
import { Config } from '../components/config/config';

@Module({
	imports: [],
	controllers: [],
	providers: [Config],
	exports: [Config],
})
export class ConfigModule {}
