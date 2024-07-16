import { BasePage } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { ParallaxPageOutline } from '@templates';
import { HostPageRouteProp } from '@types';
import React from 'react';
import ActionButtons from './components/ActionButtons';
import SubHeader from './components/SubHeader';
import useHostPage from './useHostPage';

const HostPage = () => {
	const route = useRoute<HostPageRouteProp>();
	const { hostData } = useHostPage(route.params.host_uid);

	if (!hostData) {
		return null;
	}

	return (
		<BasePage>
			<ParallaxPageOutline
				title={hostData.name}
				image={hostData.profile_image?.url || ''}
			>
				<SubHeader />
				<ActionButtons />
			</ParallaxPageOutline>
		</BasePage>
	);
};

export default HostPage;
