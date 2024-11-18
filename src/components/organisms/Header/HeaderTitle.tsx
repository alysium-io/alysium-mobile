import { Text, View } from '@atomic';
import { Props } from '@types';
import React from 'react';

interface HeaderTitleProps {
	title: string;
	subtitle?: string;
	titleProps?: Props<typeof Text>;
	subtitleProps?: Props<typeof Text>;
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
