import { BlurView } from '@atomic';
import { useTheme } from '@hooks';
import { Props } from '@types';
import React from 'react';

type MediaLayoverProps = Props<typeof BlurView> & {
	children: React.ReactNode | React.ReactNode[];
};

const MediaLayover: React.FC<MediaLayoverProps> = ({ children, ...props }) => {
	const { theme } = useTheme();
	return (
		<BlurView
			blurType='dark'
			{...props}
			style={[
				{
					position: 'absolute',
					margin: theme.spacing.m,
					padding: theme.spacing.s,
					rowGap: theme.spacing.xs,
					borderRadius: theme.borderRadii.l,
					borderWidth: theme.borderWidth.hairline,
					borderColor: '#333',
					justifyContent: 'center',
					maxWidth: '75%'
				},
				props?.style
			]}
		>
			{children}
		</BlurView>
	);
};

export default MediaLayover;
