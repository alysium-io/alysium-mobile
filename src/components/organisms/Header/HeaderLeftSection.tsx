import { View } from '@atomic';
import { StackCardInterpolationProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';

interface HeaderLeftSectionProps {
	children?: React.ReactNode;
	cardAnimationProps: StackCardInterpolationProps;
}

const HeaderLeftSection: React.FC<HeaderLeftSectionProps> = ({
	children,
	cardAnimationProps
}) => {
	/**
	 * Keep this here for now, this is how we used to animate the header
	 * components in/out of the screen, but i'm gunna try without it for a while...
	 */
	// const animatedStyle = {
	// 	transform: [
	// 		{
	// 			translateX: cardAnimationProps.current.progress.interpolate({
	// 				inputRange: [0, 1],
	// 				outputRange: [100, 0]
	// 			})
	// 		}
	// 	]
	// };

	return (
		<View paddingLeft='m' style={styles.container}>
			<View>{children}</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		flex: 1
	}
});

export default HeaderLeftSection;
