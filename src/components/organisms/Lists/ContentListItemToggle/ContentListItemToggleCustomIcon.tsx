import { Icon, View } from '@atomic';
import { IconNames } from '@svg';
import React from 'react';

interface ContentListItemToggleCustomIconProps {
	icon: IconNames;
}

const ContentListItemToggleCustomIcon: React.FC<
	ContentListItemToggleCustomIconProps
> = ({ icon }) => {
	return (
		<View padding='m'>
			<Icon name={icon} size='small' color='ion' />
		</View>
	);
};

export default ContentListItemToggleCustomIcon;
