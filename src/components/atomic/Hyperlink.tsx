import { Text } from '@atomic';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';

type HyperlinkProps = React.ComponentProps<typeof Text> & {
	buttonProps?: Omit<
		React.ComponentProps<typeof TouchableWithoutFeedback>,
		'children'
	>;
};

export const Hyperlink: React.FC<HyperlinkProps> = ({
	buttonProps,
	...props
}) => (
	<TouchableWithoutFeedback {...buttonProps}>
		<Text
			color='hyperlink.text.s'
			textDecorationLine='underline'
			variant='paragraph-small-light'
			suppressHighlighting={true}
			{...props}
		/>
	</TouchableWithoutFeedback>
);

export default Hyperlink;
