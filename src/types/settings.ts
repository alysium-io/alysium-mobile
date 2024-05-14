export enum AppType {
	test = 'test',
	artist = 'artist',
	host = 'host',
	user = 'user'
}

export type SettingsState = {
	app: AppType;
};
