import NetInfo from '@react-native-community/netinfo';
import RNDeviceInfo from 'react-native-device-info';

export type DeviceInfo = {
	manufacturer: string;
	model: string;
	platform: string;
	osVersion: string;
	appVersion: string;
	buildNumber: string;
	bundleId: string;
	deviceId: string;
	uniqueId: string;
	batteryLevel: number;
	isCharging: boolean;
	totalMemory: number;
	usedMemory: number;
	freeDiskStorage: number;
	totalDiskCapacity: number;
	isTablet: boolean;
	hasNotch: boolean;
	connectionType: string;
};

export async function collectDeviceInfo(): Promise<DeviceInfo> {
	// Get network info
	const netInfo = await NetInfo.fetch();

	const deviceInfo: DeviceInfo = {
		manufacturer: await RNDeviceInfo.getManufacturer(),
		model: RNDeviceInfo.getModel(),
		platform: RNDeviceInfo.getSystemName(),
		osVersion: RNDeviceInfo.getSystemVersion(),
		appVersion: RNDeviceInfo.getVersion(),
		buildNumber: RNDeviceInfo.getBuildNumber(),
		bundleId: RNDeviceInfo.getBundleId(),
		deviceId: RNDeviceInfo.getDeviceId(),
		uniqueId: await RNDeviceInfo.getUniqueId(),
		batteryLevel: await RNDeviceInfo.getBatteryLevel(),
		isCharging: await RNDeviceInfo.isBatteryCharging(),
		totalMemory: await RNDeviceInfo.getTotalMemory(),
		usedMemory: await RNDeviceInfo.getUsedMemory(),
		freeDiskStorage: await RNDeviceInfo.getFreeDiskStorage(),
		totalDiskCapacity: await RNDeviceInfo.getTotalDiskCapacity(),
		isTablet: RNDeviceInfo.isTablet(),
		hasNotch: RNDeviceInfo.hasNotch(),
		connectionType: netInfo.type
	};

	return deviceInfo;
}
