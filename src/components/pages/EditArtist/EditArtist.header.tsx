import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { useSheet } from '@hooks';
import {
	Header,
	HeaderIconButton,
	HeaderSection,
	HeaderTitle
} from '@organisms';
import { EditArtistPopupMenuBottomSheet } from '@popups';
import React from 'react';

interface EditArtistPageHeaderProps {}

const EditArtistPageHeader: React.FC<EditArtistPageHeaderProps> = () => {
	const { artistData } = useArtistAppContext();
	const editArtistPopupMenuSheetApi = useSheet();
	return (
		<Header>
			<HeaderSection
				CenterComponent={<HeaderTitle title={artistData.name} />}
				RightComponent={
					<HeaderIconButton
						name='menu'
						onPress={editArtistPopupMenuSheetApi.open}
					/>
				}
			/>
			<EditArtistPopupMenuBottomSheet sheetApi={editArtistPopupMenuSheetApi} />
		</Header>
	);
};

export default EditArtistPageHeader;
