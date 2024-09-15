import { NativeModules } from 'react-native';

export const getHostIp = (): string => {
	const url = NativeModules.SourceCode.scriptURL;
	const hostname = url.split('://')[1].split(':')[0];
	return hostname;
};
