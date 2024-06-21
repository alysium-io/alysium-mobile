import { useTheme } from '@hooks';
import { IconNames, SvgIcons } from '@svg';
import { IconProps as CustomIconProps, IconSize } from '@types';
import React from 'react';
import { useAnimatedProps } from 'react-native-reanimated';

type IconProps = CustomIconProps & {
	name: IconNames;
	size?: keyof IconSize;
};

const Icon: React.FC<IconProps> = (props) => {
	const { theme, getRawColor } = useTheme();

	// default: regular
	const size = props.size ? theme.iconSize[props.size] : theme.iconSize.regular;

	// default: t1
	const color = props.color ? getRawColor(props.color) : theme.colors.t1;

	const SvgIcon = SvgIcons[props.name];

	const defaultAnimateSvgProps = useAnimatedProps(() => ({}));
	const defaultAnimatePathProps = useAnimatedProps(() => ({}));

	if (props.animated) {
		return (
			<SvgIcon
				animatedSvgProps={props.animatedSvgProps || defaultAnimateSvgProps}
				animatedPathProps={props.animatedPathProps || defaultAnimatePathProps}
				{...props}
				color={props.color}
				size={size}
			/>
		);
	}

	return <SvgIcon {...props} size={size} color={color} />;
};

export default Icon;
