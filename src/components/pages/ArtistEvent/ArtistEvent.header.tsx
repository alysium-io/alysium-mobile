import { useNavigation, useSheet } from '@hooks';
import {
	Header,
	HeaderIconButton,
	HeaderSection,
	HeaderTitle
} from '@organisms';
import { ArtistEventPopupMenuBottomSheet } from '@popups';
import { NanoId } from '@types';
import React from 'react';

interface ArtistEventPageHeaderProps {
	title: string;
	event_uid: NanoId;
}

const ArtistEventPageHeader: React.FC<ArtistEventPageHeaderProps> = ({
	title,
	event_uid
}) => {
	const { back } = useNavigation();
	const artistEventPopupMenuSheetApi = useSheet();
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
						onPress={artistEventPopupMenuSheetApi.open}
					/>
				}
			/>
			<ArtistEventPopupMenuBottomSheet
				sheetApi={artistEventPopupMenuSheetApi}
				event_uid={event_uid}
			/>
		</Header>
	);
};

export default ArtistEventPageHeader;
