import { useTheme } from '@hooks';
import { IconNames, SvgIcons } from '@svg';
import { IconProps as CustomIconProps, IconSize, SemanticColor } from '@types';
import React from 'react';

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
	return <SvgIcon {...props} size={iconSize} color={theme.colors[color]} />;
};

export default Icon;
