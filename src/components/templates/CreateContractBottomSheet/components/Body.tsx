import { ConditionalRenderer, SlideInOutSequenceView, View } from '@atomic';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react';
import { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCreateContractBottomSheetContext } from '../CreateContractBottomSheet.context';
import AdditionalNotes from './AdditionalNotes';
import ConfirmPartiesInvolved from './ConfirmPartiesInvolved';
import Loading from './Loading';
import SelectFeatures from './SelectFeatures';
import SelectSlotTime from './SelectSlotTime';

const Body = () => {
	const { sequenceApi, height } = useCreateContractBottomSheetContext();
	const insets = useSafeAreaInsets();

	const bodies = [
		ConfirmPartiesInvolved,
		SelectSlotTime,
		SelectFeatures,
		AdditionalNotes
	];

	return (
		<BottomSheetView
			style={{
				paddingBottom: height + insets.bottom
			}}
		>
			<ConditionalRenderer
				componentKey={sequenceApi.state}
				componentMap={{
					...Object.fromEntries(
						bodies.map((BodyComponent, index) => [
							index,
							() => (
								<SlideInOutSequenceView
									sequenceState={sequenceApi.state}
									prevSequenceState={sequenceApi.prevState}
									sequenceIndex={index}
									key={index}
								>
									<BodyComponent />
								</SlideInOutSequenceView>
							)
						])
					),
					[bodies.length]: () => (
						<View animated entering={FadeIn.duration(350)}>
							<Loading />
						</View>
					)
				}}
			/>
		</BottomSheetView>
	);
};

export default Body;
