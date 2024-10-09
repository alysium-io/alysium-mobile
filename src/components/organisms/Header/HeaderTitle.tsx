import { Text, View } from '@atomic';
import React from 'react';

interface HeaderTitleProps {
	title: string;
	subtitle?: string;
	titleProps?: React.ComponentProps<typeof Text>;
	subtitleProps?: React.ComponentProps<typeof Text>;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({
	title,
	subtitle,
	titleProps,
	subtitleProps
}) => {
	return (
		<View>
			<Text variant='paragraph-small' color='text.p' {...titleProps}>
				{title}
			</Text>
			{subtitle && (
				<Text variant='paragraph-small' color='subtext.p' {...subtitleProps}>
					{subtitle}
				</Text>
			)}
		</View>
	);
};

export default HeaderTitle;
