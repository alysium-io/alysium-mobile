import { Icon, Text, View } from '@atomic';
import { Props, SemanticColor } from '@types';
import React from 'react';

interface ButtonTextContentProps {
	text: string;
	beforeIconProps?: Props<typeof Icon>;
	afterIconProps?: Props<typeof Icon>;
	textProps?: Props<typeof Text>;
	textColor: SemanticColor;
}

const ButtonTextContent: React.FC<ButtonTextContentProps> = ({
	text,
	beforeIconProps,
	afterIconProps,
	textProps,
	textColor
}) => {
	return (
		<View flexDirection='row' alignItems='center' justifyContent='center'>
			{beforeIconProps && (
				<View marginRight='s'>
					<Icon size='s' color={textColor} {...beforeIconProps} />
				</View>
			)}
			<Text color={textColor} variant='paragraph-small-medium' {...textProps}>
				{text}
			</Text>
			{afterIconProps && (
				<View marginLeft='s'>
					<Icon size='s' color={textColor} {...afterIconProps} />
				</View>
			)}
		</View>
	);
};

export default ButtonTextContent;
