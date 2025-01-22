import { LView, Text, View } from '@atomic';
import { dayjs } from '@etc';
import { useTheme } from '@hooks';
import { ActionButtons, PillGroup } from '@molecules';
import TogglePill from '@src/components/molecules/Pills/TogglePill';
import { useEventTiming } from '@src/utils/hooks/useEventTiming';
import { Props } from '@types';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
	const duration = dayjs.duration(dayjs(end).diff(dayjs(start)));
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
			<LView margin='m'>
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
							{dayjs(startDateTime).format('MMM. Do')}
						</Text>
						<Text variant='paragraph-large' color='text.s'>
							{dayjs(startDateTime).format('h:mm A')}
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
								{dayjs(endDateTime).format('MMM. Do')}
							</Text>
							<Text variant='paragraph-large' color='text.s' textAlign='right'>
								{dayjs(endDateTime).format('h:mm A')}
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
			</LView>
			<LView>
				<DefaultDatePicker {...datePickerOptions} />
			</LView>
			<LView margin='m'>
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
				<LView>
					<PillGroup padding='m' alignItems='center' justifyContent='center'>
						{durationOptions.map((option, idx) => (
							<TogglePill
								key={idx}
								text={option.label}
								isActive={selectedDurationOption.id === option.id}
								onPress={() => setSelectedDurationOption(option.id)}
							/>
						))}
					</PillGroup>
				</LView>
				<LView>
					<ActionButtons
						buttonProps={[
							{ text: 'cancel', variant: 'outlined', onPress: () => {} },
							{ text: 'save', color: 'p', onPress: () => {} }
						]}
					/>
				</LView>
			</LView>
		</View>
	);
};

export default SelectDatetimeWithDuration;
