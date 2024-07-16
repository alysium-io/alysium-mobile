import { Icon, Text, View } from '@atomic';
import { IconNames } from '@svg';
import { SemanticColor } from '@types';
import React from 'react';

type ContentProps = React.ComponentProps<typeof Text> & {
	afterIcon?: IconNames;
	afterIconColor?: SemanticColor;
	beforeIcon?: IconNames;
	beforeIconColor?: SemanticColor;
};

const Content: React.FC<ContentProps> = ({
	afterIcon,
	afterIconColor = 'text.p',
	beforeIcon,
	beforeIconColor = 'text.p',
	...props
}) => {
	return (
		<View flexDirection='row' alignItems='center' justifyContent='center'>
			{beforeIcon && (
				<View marginRight='s'>
					<Icon name={beforeIcon} color={beforeIconColor} size='s' />
				</View>
			)}
			<Text {...props} />
			{afterIcon && (
				<View marginLeft='s'>
					<Icon name={afterIcon} color={afterIconColor} size='s' />
				</View>
			)}
		</View>
	);
};

export default Content;
