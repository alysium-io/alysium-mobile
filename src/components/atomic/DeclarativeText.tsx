import { Props } from '@types';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Text from './Text';
import View from './View';

export const Bold: React.FC<Props<typeof Text>> = (props) => (
	<Text variant='paragraph-medium' {...props} />
);

export const P: React.FC<Props<typeof Text>> = (props) => (
	<Text variant='paragraph-light' marginBottom='s' {...props} />
);

type LinkProps = Props<typeof Text> & {
	buttonProps?: Omit<Props<typeof TouchableWithoutFeedback>, 'children'>;
};

export const Link: React.FC<LinkProps> = ({ buttonProps, ...props }) => (
	<TouchableWithoutFeedback {...buttonProps}>
		<View>
			<Text
				color='hyperlink.text.p'
				textDecorationLine='underline'
				variant='paragraph-small-light'
				{...props}
			/>
		</View>
	</TouchableWithoutFeedback>
);
