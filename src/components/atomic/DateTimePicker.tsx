import { useTheme } from '@hooks';
import { Props } from '@types';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import DatePicker from 'react-native-date-picker';

type DateTimePickerProps = Props<typeof DatePicker>;

const DateTimePicker: React.FC<DateTimePickerProps> = (props) => {
	const { themeMode } = useTheme();
	const { width } = useWindowDimensions();
	return (
		<DatePicker
			mode='datetime'
			minuteInterval={15}
			theme={themeMode}
			style={{ width }}
			{...props}
		/>
	);
};

export default DateTimePicker;
