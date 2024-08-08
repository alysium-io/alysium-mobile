import { View } from '@atomic';
import { useHeader } from '@organisms';
import { IChildrenProps } from '@types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HeaderBackground from './HeaderBackground';

interface HeaderWrapperProps extends IChildrenProps {}

const HeaderWrapper: React.FC<HeaderWrapperProps> = ({ children }) => {
	const { totalHeaderHeight, headerHeight } = useHeader();
	const insets = useSafeAreaInsets();

	return (
		<View style={[styles.container, { height: totalHeaderHeight }]}>
			<HeaderBackground />
			<View
				flexDirection='row'
				style={{
					height: headerHeight,
					marginTop: insets.top
				}}
			>
				{children}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		zIndex: 999
	}
});

export default HeaderWrapper;
