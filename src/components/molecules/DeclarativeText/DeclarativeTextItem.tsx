import { Text } from '@atomic';
import { useTheme } from '@hooks';
import React from 'react';
import { DeclarativeTextItemProps } from './shared';

const DeclarativeTextItem: React.FC<DeclarativeTextItemProps> = ({
	text,
	variant,
	color,
	underline,
	newline,
	onPress
}) => {
	const { getRawColor } = useTheme();

	return (
		<>
			{newline && '\n'}
			<Text
				lineHeight={15}
				variant={variant}
				color={color}
				onPress={onPress}
				suppressHighlighting={true}
				textDecorationLine={underline ? 'underline' : 'none'}
			>
				{text}
			</Text>
		</>
	);
};

export default DeclarativeTextItem;
