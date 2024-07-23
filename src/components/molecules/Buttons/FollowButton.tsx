import React from 'react';
import ToggleButton from './ToggleButton';

interface FollowButtonProps extends React.ComponentProps<typeof ToggleButton> {}

const FollowButton: React.FC<FollowButtonProps> = ({ ...props }) => {
	return (
		<ToggleButton
			activeButtonProps={{
				text: 'Follow'
			}}
			inactiveButtonProps={{
				text: 'Following'
			}}
			{...props}
		/>
	);
};

export default FollowButton;
