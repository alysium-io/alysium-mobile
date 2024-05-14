import { useTheme } from '@hooks';
import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView as RNGestureHandlerRootView } from 'react-native-gesture-handler';

interface GestureHandlerRootView
	extends React.ComponentProps<typeof RNGestureHandlerRootView> {}

const GestureHandlerRootView: React.FC<GestureHandlerRootView> = ({
	children
}) => {
	const { theme } = useTheme();

	return (
		<RNGestureHandlerRootView
			style={[styles.container, { backgroundColor: theme.colors.bg1 }]}
		>
			{children}
		</RNGestureHandlerRootView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

export default GestureHandlerRootView;
