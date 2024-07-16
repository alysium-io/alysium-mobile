import { BasePage } from '@organisms';
import { AddArtistToEventCandidatesBottomSheet } from '@popups';
import { ParallaxPageOutline } from '@templates';
import { ApiIdentifier } from '@types';
import React from 'react';
import SubHeader from '../../components/SubHeader';
import ActionButtons from './components/ActionButtons';
import useHostPage from './useHostPage';

interface HostProps {
	artist_uid: ApiIdentifier;
}

const Host: React.FC<HostProps> = ({ artist_uid }) => {
	const { artistData, addArtistToEventCandidatesSheetApi } =
		useHostPage(artist_uid);

	if (!artistData) {
		return null;
	}

	return (
		<BasePage>
			<ParallaxPageOutline
				title={artistData.name}
				image={artistData.profile_image?.url}
			>
				<SubHeader />
				<ActionButtons
					addArtistToEventCandidatesSheetApi={
						addArtistToEventCandidatesSheetApi
					}
				/>
			</ParallaxPageOutline>
			<AddArtistToEventCandidatesBottomSheet
				sheetApi={addArtistToEventCandidatesSheetApi}
				artist_uid={artistData.artist_uid}
			/>
		</BasePage>
	);
};

export default Host;
