import { Avatar, View } from '@atomic';
import { Vibrator } from '@etc';
import { useChooseAccountContext } from '@popups';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useArtistAppContext } from '../contexts/Artist.context';
import UserProfileTabIcon from './UserProfileTabIcon';

const ArtistProfileTabIcon = (props: {
	focused: boolean;
	color: string;
	size: number;
}) => {
	const { chooseAccountSheetApi } = useChooseAccountContext();
	const { artistData } = useArtistAppContext();
	const image = artistData.profile_image?.small.key;

	if (!image) {
		return <UserProfileTabIcon {...props} />;
	}

	return (
		<TouchableWithoutFeedback
			onLongPress={() => {
				Vibrator.notificationWarning();
				chooseAccountSheetApi.open();
			}}
			hitSlop={20}
		>
			<View
				height={22}
				width={22}
				borderRadius='round'
				overflow='hidden'
				borderWidth={1.5}
				borderColor={props.focused ? 'primary' : 'bg.t'}
				style={{ padding: 1 }}
			>
				<Avatar
					image={image}
					defaultImageProps={{
						icon: 'artist',
						iconProps: {
							size: 7,
							color: 'text.p'
						}
					}}
				/>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default ArtistProfileTabIcon;
