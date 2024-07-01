import { View } from '@atomic';
import { IChildrenProps } from '@types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { FadeIn, FadeOut } from 'react-native-reanimated';

const Backdrop: React.FC<IChildrenProps> = ({ children }) => {
	return (
		<View
			style={styles.container}
			backgroundColor='matt'
			animated
			entering={FadeIn.duration(400)}
			exiting={FadeOut.duration(200)}
		>
			{children}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		zIndex: 1
	}
});

export default Backdrop;
