import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { useNavigation, useSheet } from '@hooks';
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
	const { back } = useNavigation();
	return (
		<Header>
			<HeaderSection
				LeftComponent={<HeaderIconButton name='arrow-left' onPress={back} />}
				CenterComponent={<HeaderTitle title={artistData.name} />}
			/>
			<EditArtistPopupMenuBottomSheet sheetApi={editArtistPopupMenuSheetApi} />
		</Header>
	);
};

export default EditArtistPageHeader;
