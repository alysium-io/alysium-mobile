import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { View } from '@atomic';
import React from 'react';
import StartYourJourneyButton from '../../../components/StartYourJourneyButton';

const StartYourJourneySection = () => {
	const { createAccountBottomSheetApi } = useUserAppContext();
	return (
		<View marginBottom='xxxl'>
			<StartYourJourneyButton onPress={createAccountBottomSheetApi?.open} />
		</View>
	);
};

export default StartYourJourneySection;
