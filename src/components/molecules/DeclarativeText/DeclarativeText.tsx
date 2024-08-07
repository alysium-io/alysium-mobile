import { Text } from '@atomic';
import React from 'react';
import DeclarativeTextItem from './DeclarativeTextItem';
import { DeclarativeTextItems } from './shared';

type DeclarativeTextProps = React.ComponentProps<typeof Text> & {
	textItems: DeclarativeTextItems;
};

const DeclarativeText: React.FC<DeclarativeTextProps> = ({
	textItems,
	...props
}) => {
	if (!textItems || textItems.length === 0) {
		return null;
	}

	return (
		<Text {...props} textAlignVertical='bottom'>
			{textItems.map((item, index) => (
				<DeclarativeTextItem key={index} {...item} />
			))}
		</Text>
	);
};

export default DeclarativeText;
