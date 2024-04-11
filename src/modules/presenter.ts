import { Module } from '@nestjs/common';
import { UserPresenters } from '../api/presenters/main/user';

@Module({
	imports: [],
	controllers: [],
	providers: [UserPresenters],
	exports: [UserPresenters],
})
export class PresenterModule {}
