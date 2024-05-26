import { HeaderSafeArea, ScrollView } from '@atomic';
import { BasePage } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { ArtistViewContractPageRouteProp } from '@types';
import React from 'react';
import PartiesInvolvedSection from '../EditContract/components/PartiesInvolvedSection';
import BottomButtons from './components/BottomButtons';
import useArtistViewContractPage from './useArtistViewContractPage';

const ArtistViewContractPage = () => {
	const route = useRoute<ArtistViewContractPageRouteProp>();
	const { contractData } = useArtistViewContractPage(route.params.contractId);

	if (!contractData) {
		return null;
	}

	return (
		<BasePage>
			<HeaderSafeArea>
				<ScrollView alwaysBounceVertical>
					<PartiesInvolvedSection contractData={contractData} />
					<BottomButtons />
				</ScrollView>
			</HeaderSafeArea>
		</BasePage>
	);
};

export default ArtistViewContractPage;
