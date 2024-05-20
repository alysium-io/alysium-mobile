import { BasePage } from '@organisms';
import { ParallaxPageOutline } from '@templates';
import { ApiIdentifier } from '@types';
import React from 'react';
import LinksBottomSheet from '../../components/LinksBottomSheet';
import MoreOptionsBottomSheet from '../../components/MoreOptionsBottomSheet';
import SubHeader from '../../components/SubHeader';
import ActionButtons from './components/ActionButtons';
import useUserPage from './useUserPage';

interface UserProps {
	artistId: ApiIdentifier;
}

const User: React.FC<UserProps> = ({ artistId }) => {
	const { artistData, linksSheetApi, moreSheetApi } = useUserPage(artistId);

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
				<ActionButtons />
			</ParallaxPageOutline>
			<LinksBottomSheet sheetApi={linksSheetApi} />
			<MoreOptionsBottomSheet sheetApi={moreSheetApi} />
		</BasePage>
	);
};

export default User;
