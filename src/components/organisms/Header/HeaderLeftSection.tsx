import { View } from '@atomic';
import React from 'react';
import { StyleSheet } from 'react-native';

interface HeaderLeftSectionProps {
	children?: React.ReactNode;
}

const HeaderLeftSection: React.FC<HeaderLeftSectionProps> = ({ children }) => {
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
