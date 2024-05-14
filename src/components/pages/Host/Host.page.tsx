import { withProvider } from '@hooks';
import { BasePage } from '@organisms';
import { ParallaxPageOutline } from '@templates';
import React from 'react';
import { HostPageProvider, useHostPageContext } from './Host.context';
import {
	ActionButtons,
	LinksBottomSheet,
	MoreOptionsBottomSheet,
	NotificationsOptionsBottomSheet,
	SubHeader
} from './components';

const HostPage = () => {
	const { moreSheetApi, linksSheetApi, notificationsSheetApi, hostData } =
		useHostPageContext();

	return (
		<BasePage>
			<ParallaxPageOutline
				title={hostData.name}
				image={hostData.profile_image?.url || ''}
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

export default withProvider(HostPage, HostPageProvider);
