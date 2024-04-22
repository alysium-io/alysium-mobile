import { View } from '@atomic';
import { useTheme } from '@hooks';
import React from 'react';
import DatePicker from 'react-native-date-picker';

interface DatetimePickerProps {
	date: Date;
	onDateChange: (date: Date) => void;
}

const DatetimePicker: React.FC<DatetimePickerProps> = ({
	date,
	onDateChange
}) => {
	const { mode } = useTheme();

	return (
		<View flexDirection='row' justifyContent='center'>
			<DatePicker
				date={date}
				minimumDate={new Date()}
				mode='datetime'
				minuteInterval={15}
				onDateChange={onDateChange}
				theme={mode}
			/>
		</View>
	);
};

export default DatetimePicker;
