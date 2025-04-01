import { Icon } from '@atomic';
import { Vibrator } from '@etc';
import { useChooseAccountContext } from '@popups';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const UserProfileTabIcon = ({
	focused
}: {
	focused: boolean;
	color: string;
	size: number;
}) => {
	const { chooseAccountSheetApi } = useChooseAccountContext();

	return (
		<TouchableWithoutFeedback
			onLongPress={() => {
				Vibrator.heavy();
				chooseAccountSheetApi.open();
			}}
			hitSlop={20}
		>
			<Icon
				name='user'
				size='m'
				color={focused ? 'navbar.icon.active' : 'navbar.icon.inactive'}
			/>
		</TouchableWithoutFeedback>
	);
};

export default UserProfileTabIcon;
