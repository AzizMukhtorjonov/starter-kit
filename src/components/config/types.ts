export enum Environment {
	development = 'development',
	testing = 'testing',
	production = 'production',
}

export enum LogLevel {
	log = 'log',
	warn = 'warn',
	debug = 'debug',
	info = 'info',
	error = 'error',
}

export type AppConfig = {
	name: string;
	startTime: Date;
	version: string;
};

export type DbConfig = {
	url: string;
};

export type ServerConfig = {
	host: string;
	port: number;
};

export type ServersConfig = {
	main: ServerConfig;
};

export type DotEnv = {
	MAIN_APP_HOST: string;
	MAIN_APP_PORT: string;

	DATABASE_URL: string;

	ENVIRONMENT: string;

	LOG_LEVEL: string;

	npm_package_version: string; // package version
	npm_package_name: string; // package name
};
