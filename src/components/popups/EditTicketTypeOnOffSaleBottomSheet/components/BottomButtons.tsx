import { Or, Text, View } from '@atomic';
import { SheetApi } from '@hooks';
import { Button, ToggleButton } from '@molecules';
import React from 'react';
import { LinearTransition } from 'react-native-reanimated';

interface BottomButtonsProps {
	sheetApi: SheetApi;
	onChange: (date: Date | null) => void;
	dateValue: string | null;
	defaultNewDate: Date;
	notSchedulingSubtitle: string;
	schedulingSubtitle: string;
}

const BottomButtons: React.FC<BottomButtonsProps> = ({
	sheetApi,
	onChange,
	dateValue,
	defaultNewDate,
	notSchedulingSubtitle,
	schedulingSubtitle
}) => {
	const onPress = () => {
		if (dateValue === null) {
			onChange(defaultNewDate);
		} else {
			onChange(null);
		}
	};

	return (
		<View animated layout={LinearTransition} margin='m'>
			<View marginBottom='m'>
				<Text
					variant='paragraph-small'
					textAlign='center'
					paddingHorizontal='m'
				>
					{dateValue === null ? notSchedulingSubtitle : schedulingSubtitle}
				</Text>
				<Or />
				<ToggleButton
					onPress={onPress}
					text="Don't Schedule"
					inactiveText='Schedule'
					value={dateValue !== null}
				/>
			</View>
			<View marginTop='m'>
				<Button text='done' onPress={sheetApi.close} />
			</View>
		</View>
	);
};

export default BottomButtons;
