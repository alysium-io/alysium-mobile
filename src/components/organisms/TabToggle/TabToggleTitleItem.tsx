import { Text, View } from '@atomic';
import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { SharedValue } from 'react-native-reanimated';

interface TabToggleTitleItemProps {
	title: string;
	index: number;
	animatedValue: SharedValue<number>;
	onPress: () => void;
}

const TabToggleTitleItem: React.FC<TabToggleTitleItemProps> = ({
	title,
	onPress
}) => {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={styles.tabItemContainer} paddingBottom='m'>
				<Text variant='paragraph-small' color='text.s'>
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
