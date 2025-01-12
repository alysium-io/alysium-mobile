import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { useNavigation, useSheet } from '@hooks';
import {
	Header,
	HeaderIconButton,
	HeaderSection,
	HeaderTitle
} from '@organisms';
import React from 'react';
import PopupMenuSheet from './sheets/PopupMenuSheet';

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
			<PopupMenuSheet sheetApi={editArtistPopupMenuSheetApi} />
		</Header>
	);
};

export default EditArtistPageHeader;
