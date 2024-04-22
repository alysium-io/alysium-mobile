import { Icon } from '@atomic';
import { IconNames } from '@svg';
import React from 'react';
import { StyleSheet } from 'react-native';

interface RadioListItemIconProps {
	icon: IconNames;
}

const RadioListItemIcon: React.FC<RadioListItemIconProps> = ({ icon }) => {
	return <Icon name={icon} size='xlarge' color='t2' />;
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		aspectRatio: 1,
		width: 65
	}
});

export default RadioListItemIcon;
