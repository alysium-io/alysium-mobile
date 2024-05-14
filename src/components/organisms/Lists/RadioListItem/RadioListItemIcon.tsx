import { Icon } from '@atomic';
import { IconNames } from '@svg';
import React from 'react';

interface RadioListItemIconProps {
	icon: IconNames;
}

const RadioListItemIcon: React.FC<RadioListItemIconProps> = ({ icon }) => {
	return <Icon name={icon} size='xlarge' color='t2' />;
};

export default RadioListItemIcon;
