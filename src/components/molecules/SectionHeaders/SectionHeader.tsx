import { Icon, Text, View } from '@atomic';
import { IconNames } from '@svg';
import { IconSize, RestyleTextColor } from '@types';
import React from 'react';

const settings = {
	regular: {
		textVariant: 'section-header-1',
		iconName: 'info-one' as IconNames,
		iconSize: 'regular' as keyof IconSize,
		iconColor: 't2'
	},
	large: {
		textVariant: 'section-header-2',
		iconName: 'info-two' as IconNames,
		iconSize: 'large' as keyof IconSize,
		iconColor: 't3'
	}
};

type SectionHeaderProps = React.ComponentProps<typeof View> & {
	text: string;
	color?: RestyleTextColor;
	titleVariant?: keyof typeof settings;
	icon?: IconNames;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
	text,
	color,
	titleVariant = 'regular' as keyof typeof settings,
	icon,
	...props
}) => {
	return (
		<View
			marginBottom='s'
			flexDirection='row'
			justifyContent='space-between'
			alignItems='center'
			{...props}
		>
			<View flexDirection='row' alignItems='center'>
				<Text
					variant={settings[titleVariant].textVariant}
					color={color ? color : 't1'}
				>
					{text}
				</Text>
				{icon && (
					<View marginLeft='s'>
						<Icon
							name={icon}
							size={settings[titleVariant].iconSize}
							color='ion'
						/>
					</View>
				)}
			</View>
			<Icon
				name={settings[titleVariant].iconName}
				color={settings[titleVariant].iconColor}
				size={settings[titleVariant].iconSize}
			/>
		</View>
	);
};

export default SectionHeader;
