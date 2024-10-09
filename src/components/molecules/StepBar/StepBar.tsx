import { View } from '@atomic';
import React from 'react';
import Bar from './components/Bar';
import Indicator from './components/Indicator';

interface StepBarProps {
	steps: number;
	currentStep: number;
}

const StepBar: React.FC<StepBarProps> = ({ steps, currentStep }) => {
	return (
		<View flexDirection='row' justifyContent='space-between'>
			<Bar />
			{Array.from({ length: steps }).map((_, index) => (
				<Indicator key={index} isActive={index === currentStep} />
			))}
		</View>
	);
};

export default StepBar;
