import { View } from '@atomic';
import { useSequence } from '@hooks';
import { ActionButtons, StepBar as CustomStepBar } from '@molecules';
import React from 'react';

const StepBar = () => {
	const numSteps = 7;
	const sequenceApi = useSequence(numSteps);
	return (
		<View margin='m' flex={1} justifyContent='center'>
			<ActionButtons
				buttonProps={[
					{ text: 'Back', onPress: sequenceApi.back, variant: 'outlined' },
					{ text: 'Next', onPress: sequenceApi.next }
				]}
			/>
			<View marginTop='l'>
				<CustomStepBar
					steps={numSteps}
					currentStep={sequenceApi.sequenceIndex}
				/>
			</View>
		</View>
	);
};

export default StepBar;
