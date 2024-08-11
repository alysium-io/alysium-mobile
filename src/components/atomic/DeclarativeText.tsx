import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Text from './Text';
import View from './View';

export const Bold: React.FC<React.ComponentProps<typeof Text>> = (props) => (
	<Text variant='paragraph-medium' {...props} />
);

export const P: React.FC<React.ComponentProps<typeof Text>> = (props) => (
	<Text variant='paragraph-light' marginBottom='s' {...props} />
);

type LinkProps = React.ComponentProps<typeof Text> & {
	buttonProps?: Omit<
		React.ComponentProps<typeof TouchableWithoutFeedback>,
		'children'
	>;
};
export const Link: React.FC<LinkProps> = ({ buttonProps, ...props }) => (
	<TouchableWithoutFeedback {...buttonProps}>
		<View>
			<Text
				color='hyperlink.text'
				textDecorationLine='underline'
				variant='paragraph-small-light'
				{...props}
			/>
		</View>
	</TouchableWithoutFeedback>
);
