import { BasePage } from '@organisms';
import { AddArtistToEventCandidatesBottomSheet } from '@popups';
import { ParallaxPageOutline } from '@templates';
import { ApiIdentifier } from '@types';
import React from 'react';
import LinksBottomSheet from '../../components/LinksBottomSheet';
import MoreOptionsBottomSheet from '../../components/MoreOptionsBottomSheet';
import SubHeader from '../../components/SubHeader';
import ActionButtons from './components/ActionButtons';
import useHostPage from './useHostPage';

interface HostProps {
	artist_uid: ApiIdentifier;
}

const Host: React.FC<HostProps> = ({ artist_uid }) => {
	const {
		artistData,
		linksSheetApi,
		moreSheetApi,
		addArtistToEventCandidatesSheetApi
	} = useHostPage(artist_uid);

	if (!artistData) {
		return null;
	}

	return (
		<BasePage>
			<ParallaxPageOutline
				title={artistData.name}
				image={artistData.profile_image?.url}
			>
				<SubHeader linksSheetApi={linksSheetApi} />
				<ActionButtons
					addArtistToEventCandidatesSheetApi={
						addArtistToEventCandidatesSheetApi
					}
				/>
			</ParallaxPageOutline>
			<LinksBottomSheet sheetApi={linksSheetApi} />
			<MoreOptionsBottomSheet sheetApi={moreSheetApi} />
			<AddArtistToEventCandidatesBottomSheet
				sheetApi={addArtistToEventCandidatesSheetApi}
				artist_uid={artistData.artist_uid}
			/>
		</BasePage>
	);
};

export default Host;
