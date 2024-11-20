import { Text, View } from '@atomic';
import { useTheme } from '@hooks';
import { ActionButtons, PillGroup } from '@molecules';
import TogglePill from '@src/components/molecules/Pills/TogglePill';
import { useEventTiming } from '@src/utils/hooks/useEventTiming';
import { Props } from '@types';
import day from 'dayjs';
import duration from 'dayjs/plugin/duration';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { LinearTransition } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
var advancedFormat = require('dayjs/plugin/advancedFormat');
day.extend(advancedFormat);
day.extend(duration);

type Resolution =
	| 'year'
	| 'month'
	| 'week'
	| 'day'
	| 'hour'
	| 'minute'
	| 'second';

export function formatDuration(
	start: Date,
	end: Date,
	resolution: Resolution = 'second'
): string {
	const duration = day.duration(day(end).diff(day(start)));
	const units: Resolution[] = [
		'year',
		'month',
		'week',
		'day',
		'hour',
		'minute',
		'second'
	];
	const resolutionIndex = units.indexOf(resolution);
	const parts: string[] = [];

	const values = {
		year: Math.floor(duration.asYears()),
		month: duration.months(),
		week: Math.floor(duration.asWeeks() % 4),
		day: duration.days() % 7,
		hour: duration.hours(),
		minute: duration.minutes(),
		second: duration.seconds()
	};

	for (let i = 0; i <= resolutionIndex; i++) {
		const unit = units[i];
		const value = values[unit];

		if (value > 0 || (parts.length === 0 && i === resolutionIndex)) {
			parts.push(`${value} ${unit}${value === 1 ? '' : 's'}`);
		}
	}

	return parts.join(', ');
}

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

const SelectDatetimeWithDuration = () => {
	const insets = useSafeAreaInsets();

	const {
		startDateTime,
		endDateTime,
		currentDuration,
		selectedDurationOption,
		durationOptions,
		setSelectedDurationOption,
		datePickerOptions,
		isEditingStartOrEnd,
		setIsEditingStartOrEnd
	} = useEventTiming();

	return (
		<View
			style={{ marginTop: insets.top, marginBottom: insets.bottom }}
			justifyContent='flex-end'
			flex={1}
		>
			<View animated layout={LinearTransition} margin='m'>
				<View
					flexDirection='row'
					alignItems='flex-end'
					justifyContent='space-between'
				>
					<View
						marginBottom='xl'
						opacity={
							selectedDurationOption.id === 'custom' &&
							isEditingStartOrEnd === 'end'
								? 0.5
								: 1
						}
					>
						<Text variant='paragraph' color='text.q' marginBottom='xs'>
							Start Date
						</Text>
						<Text variant='section-header-1' marginBottom='xs'>
							{day(startDateTime).format('MMM. Do')}
						</Text>
						<Text variant='paragraph-large' color='text.s'>
							{day(startDateTime).format('h:mm A')}
						</Text>
					</View>
					{selectedDurationOption.id === 'custom' && endDateTime && (
						<View
							marginBottom='xl'
							opacity={isEditingStartOrEnd === 'start' ? 0.5 : 1}
						>
							<Text
								variant='paragraph'
								color='text.q'
								marginBottom='xs'
								textAlign='right'
							>
								End Date
							</Text>
							<Text
								variant='section-header-1'
								marginBottom='xs'
								textAlign='right'
							>
								{day(endDateTime).format('MMM. Do')}
							</Text>
							<Text variant='paragraph-large' color='text.s' textAlign='right'>
								{day(endDateTime).format('h:mm A')}
							</Text>
						</View>
					)}
				</View>
				{currentDuration && (
					<View marginBottom='xl'>
						<Text variant='paragraph' color='text.q' marginBottom='xs'>
							Duration
						</Text>
						<Text variant='section-header-1' marginBottom='xs'>
							{formatDuration(startDateTime, endDateTime!, 'minute')}
						</Text>
					</View>
				)}
			</View>
			<View animated layout={LinearTransition}>
				<DefaultDatePicker {...datePickerOptions} />
			</View>
			<View margin='m' animated layout={LinearTransition}>
				{selectedDurationOption.id === 'custom' && (
					<PillGroup alignItems='center' justifyContent='center'>
						<TogglePill
							text='Start Time'
							isActive={isEditingStartOrEnd === 'start'}
							onPress={() => setIsEditingStartOrEnd('start')}
						/>
						<TogglePill
							text='End Time'
							isActive={isEditingStartOrEnd === 'end'}
							onPress={() => setIsEditingStartOrEnd('end')}
						/>
					</PillGroup>
				)}
				<PillGroup
					padding='m'
					alignItems='center'
					justifyContent='center'
					animated
					layout={LinearTransition}
				>
					{durationOptions.map((option, idx) => (
						<TogglePill
							key={idx}
							text={option.label}
							isActive={selectedDurationOption.id === option.id}
							onPress={() => setSelectedDurationOption(option.id)}
						/>
					))}
				</PillGroup>
				<View animated layout={LinearTransition}>
					<ActionButtons
						buttonProps={[
							{ text: 'cancel', variant: 'outlined', onPress: () => {} },
							{ text: 'save', color: 'p', onPress: () => {} }
						]}
					/>
				</View>
			</View>
		</View>
	);
};

export default SelectDatetimeWithDuration;
