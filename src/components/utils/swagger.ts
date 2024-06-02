import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Config } from '../config/config';

export class Swagger {
	private readonly developer = {
		name: 'Aziz Mukhtorjonov (Handeye)',
		contact: 'https://t.me/Handeye_Az',
		email: 'handeye1512@gmail.com',
	};
	constructor(private readonly config: Config) {}
	async init(app: INestApplication): Promise<void> {
		const apiDocument = new DocumentBuilder()
			.setTitle(`${this.config.app.name} API`)
			.setDescription(`Open API of ${this.config.app.name}`)
			.setVersion(this.config.app.version)
			.setContact(this.developer.name, this.developer.contact, this.developer.email)
			.addTag('environment', this.config.environment)
			.build();

		const document = SwaggerModule.createDocument(app, apiDocument);
		SwaggerModule.setup('api', app, document, {
			customSiteTitle: `Swagger: ${this.config.app.name}`,
		});
	}
}
