import { Text } from '@atomic';
import { Props } from '@types';
import React from 'react';
import DeclarativeTextItem from './DeclarativeTextItem';
import { DeclarativeTextItems } from './shared';

type DeclarativeTextProps = Props<typeof Text> & {
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
			{textItems.map((item: DeclarativeTextItems[number], index: number) => (
				<DeclarativeTextItem key={index} {...item} />
			))}
		</Text>
	);
};

export default DeclarativeText;
