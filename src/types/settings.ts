export enum AppType {
	artist = 'artist',
	user = 'user'
}

export type SettingsState = {
	app: AppType;
};
