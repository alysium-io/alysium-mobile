import { Icon, View } from '@atomic';
import { IconNames } from '@svg';
import React from 'react';
import { StyleSheet } from 'react-native';

interface ContentListItemToggleCustomIconProps {
	icon: IconNames;
}

const ContentListItemToggleCustomIcon: React.FC<
	ContentListItemToggleCustomIconProps
> = ({ icon }) => {
	return (
		<View padding='m'>
			<View style={styles.container}>
				<Icon name={icon} size='small' color='ion' />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 25,
		height: 25,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

export default ContentListItemToggleCustomIcon;
