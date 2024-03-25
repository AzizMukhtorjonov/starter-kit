import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MainAppModule } from '../src/modules/main.application';

describe('AppController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [MainAppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});
});
