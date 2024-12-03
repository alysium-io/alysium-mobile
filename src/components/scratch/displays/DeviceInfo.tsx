import { Text, View } from '@atomic';
import {
	collectDeviceInfo,
	type DeviceInfo as TDeviceInfo
} from '@src/etc/device';
import React, { useEffect, useState } from 'react';

const DeviceInfo = () => {
	const [deviceInfo, setDeviceInfo] = useState<TDeviceInfo | null>(null);

	useEffect(() => {
		collectDeviceInfo().then((info: TDeviceInfo) => setDeviceInfo(info));
	}, []);

	return (
		<View margin='m'>
			<Text variant='page-header' marginBottom='m'>
				DeviceInfo
			</Text>
			{deviceInfo &&
				Object.keys(deviceInfo).map((key) => (
					<Text key={key}>
						{key}: {deviceInfo[key as keyof TDeviceInfo]}
					</Text>
				))}
		</View>
	);
};

export default DeviceInfo;
