import { BasePage } from '@organisms';
import { ParallaxPageOutline } from '@templates';
import React from 'react';
import { ArtistPageProvider, useArtistPageContext } from './Artist.context';
import {
	ActionButtons,
	LinksBottomSheet,
	MoreOptionsBottomSheet,
	NotificationsOptionsBottomSheet,
	SubHeader
} from './components';

const ArtistPage = () => {
	const { moreSheetApi, notificationsSheetApi, linksSheetApi, artistData } =
		useArtistPageContext();

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
		</BasePage>
	);
};

export default () => (
	<ArtistPageProvider>
		<ArtistPage />
	</ArtistPageProvider>
);
