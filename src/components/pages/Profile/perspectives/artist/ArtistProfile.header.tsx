import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { Icon, Text, View } from '@atomic';
import { useSheet } from '@hooks';
import {
	Header,
	HeaderIconButton,
	HeaderSection,
	HeaderTitle
} from '@organisms';
import React from 'react';
import ArtistProfileMenuBottomSheet from './sheets/ArtistProfileMenuBottomSheet';

const ArtistProfilePageHeader: React.FC = () => {
	const artistProfileMenuBottomSheet = useSheet();
	const { userData } = useUserAppContext();
	const { artistData } = useArtistAppContext();
	return (
		<Header>
			<HeaderSection
				LeftComponent={
					<HeaderTitle
						title={artistData.name}
						subtitle={
							<View flexDirection='row' alignItems='center'>
								<Icon name='at' color='text.q' size='xs' />
								<Text marginLeft='xs' variant='paragraph' color='text.q'>
									{userData.handle}
								</Text>
							</View>
						}
						subtitleProps={{
							marginTop: 'xs'
						}}
						titleProps={{ variant: 'paragraph' }}
					/>
				}
				CenterComponent={null}
				RightComponent={
					<HeaderIconButton
						name='menu'
						onPress={artistProfileMenuBottomSheet.open}
					/>
				}
			/>
			<ArtistProfileMenuBottomSheet sheetApi={artistProfileMenuBottomSheet} />
		</Header>
	);
};

export default ArtistProfilePageHeader;
