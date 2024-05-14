import { Text, View } from '@atomic';
import React from 'react';
import { StyleSheet } from 'react-native';

interface HeaderTitleProps {
	title: string;
	subtitle?: string;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({ title, subtitle }) => {
	return (
		<View style={styles.container}>
			<Text variant='paragraph' color='t1'>
				{title}
			</Text>
			{subtitle && (
				<Text variant='paragraph' color='t2'>
					{subtitle}
				</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {}
});

export default HeaderTitle;
