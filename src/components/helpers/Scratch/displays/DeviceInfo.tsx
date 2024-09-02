import { Text, View } from '@atomic';
import { collectDeviceInfo, type DeviceInfo } from '@src/etc/device';
import React, { useEffect, useState } from 'react';

const DeviceInfo = () => {
	const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);

	useEffect(() => {
		collectDeviceInfo().then((info: DeviceInfo) => setDeviceInfo(info));
	}, []);

	return (
		<View margin='m'>
			<Text variant='page-header' marginBottom='m'>
				DeviceInfo
			</Text>
			{deviceInfo &&
				Object.keys(deviceInfo).map((key) => (
					<Text key={key}>
						{key}: {deviceInfo[key as keyof DeviceInfo]}
					</Text>
				))}
		</View>
	);
};

export default DeviceInfo;
