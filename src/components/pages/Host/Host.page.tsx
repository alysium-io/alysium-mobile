import { BasePage } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { ParallaxPageOutline } from '@templates';
import { HostPageRouteProp } from '@types';
import React from 'react';
import ActionButtons from './components/ActionButtons';
import LinksBottomSheet from './components/LinksBottomSheet';
import MoreOptionsBottomSheet from './components/MoreOptionsBottomSheet';
import NotificationsOptionsBottomSheet from './components/NotificationsOptionsBottomSheet';
import SubHeader from './components/SubHeader';
import useHostPage from './useHostPage';

const HostPage = () => {
	const route = useRoute<HostPageRouteProp>();
	const { moreSheetApi, linksSheetApi, notificationsSheetApi, hostData } =
		useHostPage(route.params.host_uid);

	if (!hostData) {
		return null;
	}

	return (
		<BasePage>
			<ParallaxPageOutline
				title={hostData.name}
				image={hostData.profile_image?.url || ''}
			>
				<SubHeader linksSheetApi={linksSheetApi} />
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

export default HostPage;
