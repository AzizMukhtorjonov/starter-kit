import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma';

@Injectable()
export class Db {
	constructor(private readonly _prisma: PrismaService) {}

	get main(): PrismaService {
		return this._prisma;
	}
}
