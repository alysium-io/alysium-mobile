import { useNavigation, useSheet } from '@hooks';
import {
	Header,
	HeaderIconButton,
	HeaderSection,
	HeaderTitle
} from '@organisms';
import { NanoId } from '@types';
import React from 'react';
import MenuPopupSheet from './sheets/MenuPopupSheet';

interface ArtistPageHeaderProps {
	title: string;
	artist_uid: NanoId;
}

const ArtistPageHeader: React.FC<ArtistPageHeaderProps> = ({
	title,
	artist_uid
}) => {
	const { back } = useNavigation();
	const artistPopupMenuSheetApi = useSheet();
	return (
		<Header>
			<HeaderSection
				LeftComponent={<HeaderIconButton onPress={back} name='arrow-left' />}
				CenterComponent={
					<HeaderTitle
						title={title}
						titleProps={{ variant: 'paragraph-small' }}
					/>
				}
				RightComponent={
					<HeaderIconButton
						name='menu'
						onPress={artistPopupMenuSheetApi.open}
					/>
				}
			/>
			<MenuPopupSheet
				sheetApi={artistPopupMenuSheetApi}
				artist_uid={artist_uid}
			/>
		</Header>
	);
};

export default ArtistPageHeader;
