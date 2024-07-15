import { Text } from '@atomic';
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
