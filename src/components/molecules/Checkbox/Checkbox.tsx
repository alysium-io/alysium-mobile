import { Checkbox as ACheckbox, Text, View } from '@atomic';
import { Props } from '@types';
import React from 'react';

interface CheckboxProps {
	title: string;
	subtitle: string | React.ReactNode;
	titleProps?: Props<typeof Text>;
	subtitleProps?: Props<typeof Text>;
	checked: boolean;
	onPress: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
	title,
	subtitle,
	checked,
	onPress,
	titleProps,
	subtitleProps
}) => {
	return (
		<View marginVertical='m' flexDirection='row' alignItems='center'>
			<View flex={1} rowGap='s'>
				<Text variant='paragraph-large-medium' {...titleProps}>
					{title}
				</Text>
				{typeof subtitle === 'string' ? (
					<Text variant='paragraph-small' color='text.s' {...subtitleProps}>
						{subtitle}
					</Text>
				) : (
					subtitle
				)}
			</View>
			<ACheckbox checked={checked} onPress={onPress} />
		</View>
	);
};

export default Checkbox;
