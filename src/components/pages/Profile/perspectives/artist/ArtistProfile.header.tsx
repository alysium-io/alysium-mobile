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
	return (
		<Header>
			<HeaderSection
				CenterComponent={
					<HeaderTitle
						title='Artist'
						titleProps={{ variant: 'paragraph', color: 'text.q' }}
					/>
				}
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
