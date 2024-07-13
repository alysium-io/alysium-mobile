import { useTheme } from '@hooks';
import { IconNames, SvgIcons } from '@svg';
import { IconProps as CustomIconProps, IconSize, SemanticColor } from '@types';
import React from 'react';
import { useAnimatedProps } from 'react-native-reanimated';

type IconProps = CustomIconProps & {
	name: IconNames;
	color?: SemanticColor;
	size?: keyof IconSize | number;
};

const Icon: React.FC<IconProps> = ({
	name,
	color = 'icon.p',
	size = 'regular',
	...props
}) => {
	const { theme } = useTheme();

	const SvgIcon = SvgIcons[name];

	const defaultAnimateSvgProps = useAnimatedProps(() => ({}));
	const defaultAnimatePathProps = useAnimatedProps(() => ({}));

	if (props.animated) {
		return (
			<SvgIcon
				animatedSvgProps={props.animatedSvgProps || defaultAnimateSvgProps}
				animatedPathProps={props.animatedPathProps || defaultAnimatePathProps}
				{...props}
				color={theme.colors[color]}
				size={size}
			/>
		);
	}

	return (
		<SvgIcon
			{...props}
			size={typeof size === 'string' ? theme.iconSize[size] : size}
			color={theme.colors[color]}
		/>
	);
};

export default Icon;
