import { DefaultIconImage, View } from '@atomic';
import { IconNames } from '@svg';
import React from 'react';
import { imageSizeScheme } from './shared';

interface ContentListItemToggleImageIconProps {
	size: keyof typeof imageSizeScheme;
	icon: IconNames;
}

const ContentListItemToggleImageIcon: React.FC<
	ContentListItemToggleImageIconProps
> = ({ size, icon }) => {
	return (
		<View style={{ height: imageSizeScheme[size] }}>
			<DefaultIconImage icon={icon} />
		</View>
	);
};

export default ContentListItemToggleImageIcon;
