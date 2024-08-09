import React from 'react';
import Text from './Text';

export const Bold: React.FC<React.ComponentProps<typeof Text>> = (props) => (
	<Text variant='paragraph-medium' {...props} />
);

export const P: React.FC<React.ComponentProps<typeof Text>> = (props) => (
	<Text variant='paragraph-light' marginBottom='s' {...props} />
);

export const Link: React.FC<React.ComponentProps<typeof Text>> = (props) => (
	<Text
		color='hyperlink.text'
		textDecorationLine='underline'
		variant='paragraph-small-light'
		{...props}
	/>
);
