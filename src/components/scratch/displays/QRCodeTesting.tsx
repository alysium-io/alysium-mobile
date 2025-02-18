import { QRCode, View } from '@atomic';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const QRCodeTesting = () => {
	const insets = useSafeAreaInsets();
	const data = 'https://alysium.io/event/1234567890123';

	return (
		<View style={{ paddingTop: insets.top, flex: 1 }}>
			<View style={{ flex: 1, backgroundColor: 'green' }} />
			<View flex={1}>
				<QRCode
					data={data}
					gradient={{
						type: 'linear',
						options: {
							start: [0, 0],
							end: [1, 1],
							colors: ['#da0c8b', '#00bfff'],
							locations: [0, 1]
						}
					}}
				/>
			</View>
			<View style={{ flex: 1, backgroundColor: 'blue' }} />
		</View>
	);
};

export default QRCodeTesting;
