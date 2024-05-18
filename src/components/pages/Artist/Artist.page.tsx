import { withProvider } from '@hooks';
import { BasePage } from '@organisms';
import { AddArtistToEventCandidatesBottomSheet } from '@popups';
import { ParallaxPageOutline } from '@templates';
import React from 'react';
import { ArtistPageProvider, useArtistPageContext } from './Artist.context';
import ActionButtons from './components/ActionButtons';
import LinksBottomSheet from './components/LinksBottomSheet';
import MoreOptionsBottomSheet from './components/MoreOptionsBottomSheet';
import NotificationsOptionsBottomSheet from './components/NotificationsOptionsBottomSheet';
import SubHeader from './components/SubHeader';

const ArtistPage = () => {
	const {
		moreSheetApi,
		notificationsSheetApi,
		linksSheetApi,
		artistData,
		addArtistToEventCandidatesSheetApi
	} = useArtistPageContext();

	return (
		<BasePage>
			<ParallaxPageOutline
				title={artistData.name}
				image={artistData.profile_image?.url || ''}
			>
				<SubHeader />
				<ActionButtons />
			</ParallaxPageOutline>
			<LinksBottomSheet sheetRef={linksSheetApi.sheetRef} />
			<MoreOptionsBottomSheet sheetRef={moreSheetApi.sheetRef} />
			<NotificationsOptionsBottomSheet
				sheetRef={notificationsSheetApi.sheetRef}
			/>
			<AddArtistToEventCandidatesBottomSheet
				sheetApi={addArtistToEventCandidatesSheetApi}
				artist_id={artistData.artist_id}
			/>
		</BasePage>
	);
};

export default withProvider(ArtistPage, ArtistPageProvider);
