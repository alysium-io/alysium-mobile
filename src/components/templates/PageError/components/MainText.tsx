import { Text, View } from '@atomic';
import React from 'react';

interface MainTextProps {
	title: string;
	description: string;
}

const MainText: React.FC<MainTextProps> = ({ title, description }) => {
	return (
		<View flex={1} justifyContent='center' alignItems='center'>
			<Text variant='page-header' marginBottom='s' color='text.s'>
				{title}
			</Text>
			<Text variant='paragraph-medium' color='text.t'>
				{description}
			</Text>
		</View>
	);
};

export default MainText;
