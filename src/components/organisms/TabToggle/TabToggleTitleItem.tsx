import { Text, View } from '@atomic';
import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { SharedValue, useDerivedValue } from 'react-native-reanimated';

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

	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={styles.tabItemContainer} paddingBottom='m'>
				<Text animated variant='paragraph-small' color='text.s'>
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
