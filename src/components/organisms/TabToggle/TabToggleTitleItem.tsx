import { Text, View } from '@atomic';
import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import {
	SharedValue,
	useAnimatedStyle,
	useDerivedValue
} from 'react-native-reanimated';

interface TabToggleTitleItemProps {
	title: string;
	index: number;
	animatedValue: SharedValue<number>;
	onPress: () => void;
}

const TabToggleTitleItem: React.FC<TabToggleTitleItemProps> = ({
	title,
	index,
	animatedValue,
	onPress
}) => {
	const isActive = useDerivedValue(() => {
		return animatedValue.value === index;
	}, [animatedValue]);

	const animatedTextStyles = useAnimatedStyle(() => {
		return {
			color: isActive.value ? 'white' : 'gray'
		};
	});

	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={styles.tabItemContainer} paddingBottom='m'>
				<Text animated variant='p2-light' style={animatedTextStyles}>
					{title}
				</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {},
	tabItemContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default TabToggleTitleItem;
