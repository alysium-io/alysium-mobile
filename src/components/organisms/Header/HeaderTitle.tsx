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
			<Text variant='paragraph' color='text.p'>
				{title}
			</Text>
			{subtitle && (
				<Text variant='paragraph' color='subtext.p'>
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
