import { View } from '@atomic';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';

const { width: containerWidth } = Dimensions.get('window');

interface TabToggleContentItemProps {
	children: React.ReactNode;
}

const TabToggleContentItem: React.FC<TabToggleContentItemProps> = ({
	children
}) => {
	return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
	container: {
		width: containerWidth
	}
});

export default TabToggleContentItem;
