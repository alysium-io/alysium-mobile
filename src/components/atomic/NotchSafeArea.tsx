import { View } from '@atomic';
import { IChildrenProps } from '@types';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface NotchSafeAreaProps extends IChildrenProps {}

const NotchSafeArea: React.FC<NotchSafeAreaProps> = ({ children }) => {
	const insets = useSafeAreaInsets();

	return (
		<View style={{ marginTop: insets.top }} flex={1}>
			{children}
		</View>
	);
};

export default NotchSafeArea;
