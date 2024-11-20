import { useTheme } from '@hooks';
import { Props } from '@types';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import DatePicker from 'react-native-date-picker';

type DefaultDatePickerProps = Props<typeof DatePicker>;

const DefaultDatePicker: React.FC<DefaultDatePickerProps> = (props) => {
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

export default DefaultDatePicker;
