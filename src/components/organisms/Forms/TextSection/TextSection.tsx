import { Text, View } from '@atomic';
import { useTheme } from '@hooks';
import React from 'react';

interface TextSectionProps {
	header: string;
	body: string;
}

const TextSection: React.FC<TextSectionProps> = ({ header, body }) => {
	const { getRawColor } = useTheme();

	return (
		<View>
			<Text variant='paragraph-medium' marginBottom='s'>
				{header}
			</Text>
			<View
				padding='s'
				style={{
					borderLeftWidth: 0.5,
					borderRightWidth: 0.5,
					borderColor: getRawColor('t2')
				}}
			>
				<Text variant='paragraph' color='t2'>
					{body}
				</Text>
			</View>
		</View>
	);
};

export default TextSection;
