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
	size = 'regular' as keyof IconSize,
	...props
}) => {
	const { theme } = useTheme();

	const SvgIcon = SvgIcons[name];

	const iconSize = typeof size === 'string' ? theme.iconSize[size] : size;

	const defaultAnimateSvgProps = useAnimatedProps(() => ({}));
	const defaultAnimatePathProps = useAnimatedProps(() => ({}));

	if (props.animated) {
		return (
			<SvgIcon
				animatedSvgProps={props.animatedSvgProps || defaultAnimateSvgProps}
				animatedPathProps={props.animatedPathProps || defaultAnimatePathProps}
				{...props}
				color={theme.colors[color]}
				size={iconSize}
			/>
		);
	}

	return <SvgIcon {...props} size={iconSize} color={theme.colors[color]} />;
};

export default Icon;
