import { Icon, Text, View } from '@atomic';
import { useSheet } from '@hooks';
import { Header, HeaderSection } from '@organisms';
import { useChooseAccountContext } from '@popups';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ArtistProfileMenuBottomSheet from './perspectives/artist/sheets/ArtistProfileMenuBottomSheet';

interface ProfilePageHeaderProps {
	name: string;
}

const ProfilePageHeader: React.FC<ProfilePageHeaderProps> = ({ name }) => {
	const { chooseAccountSheetApi } = useChooseAccountContext();
	const artistProfileMenuBottomSheet = useSheet();

	return (
		<Header>
			<HeaderSection
				LeftComponent={
					<TouchableOpacity
						onPress={chooseAccountSheetApi.open}
						// Yes this style is necessary, don't ask me why...
						// for some reason the chevron arrow down gets pushed out of the
						// pressable area without this style, and the rest of the styles
						// here, so don't touch anything.
						style={{
							flexDirection: 'row',
							alignItems: 'center'
						}}
					>
						<View flexDirection='row' alignItems='center'>
							<Text
								variant='page-header'
								color='text.p'
								numberOfLines={1}
								adjustsFontSizeToFit
								minimumFontScale={0.5}
								marginRight='s'
								flexShrink={1}
							>
								{name}
							</Text>
							<Icon name='arrow-down' color='text.p' size='m' />
						</View>
					</TouchableOpacity>
				}
				CenterComponent={null}
				leftComponentContainerProps={{
					flex: 2
				}}
			/>
			<ArtistProfileMenuBottomSheet sheetApi={artistProfileMenuBottomSheet} />
		</Header>
	);
};

export default ProfilePageHeader;
