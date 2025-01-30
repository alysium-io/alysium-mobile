import { LView, Text, View } from '@atomic';
import { dayjs } from '@etc';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import { ActionButtons, PillGroup, TogglePill } from '@molecules';
import { BottomSheet } from '@organisms';
import { useEventTiming } from '@src/utils/hooks/useEventTiming';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Resolution =
	| 'year'
	| 'month'
	| 'week'
	| 'day'
	| 'hour'
	| 'minute'
	| 'second';

interface SelectEventDateTimeBottomSheetProps {
	sheetApi: SheetApi;
	defaultStartDateTime: Date | null;
	defaultEndDateTime?: Date | null;
	onPressSave?: (startDateTime: Date, endDateTime: Date | null) => void;
}

const SelectEventDateTimeBottomSheet: React.FC<
	SelectEventDateTimeBottomSheetProps
> = ({ sheetApi, defaultStartDateTime, defaultEndDateTime, onPressSave }) => {
	const insets = useSafeAreaInsets();
	const [resetKey, setResetKey] = useState<string>('0');

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
	} = useEventTiming(
		{
			startDateTime: defaultStartDateTime,
			endDateTime: defaultEndDateTime
		},
		resetKey
	);

	const onDismiss = () => {
		setResetKey((prev) => `${parseInt(prev) + 1}`);
	};

	const _onPressSave = () => {
		onPressSave && onPressSave(startDateTime, endDateTime);
		sheetApi.close();
	};

	const formatDuration = (
		start: Date,
		end: Date,
		resolution: Resolution = 'second'
	): string => {
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
	};

	return (
		<BottomSheet ref={sheetApi.sheetRef} onDismiss={onDismiss}>
			<BottomSheetScrollView style={{ flex: 1 }}>
				<LView margin='m'>
					<LView
						flexDirection={
							selectedDurationOption.id === 'custom' ? 'row' : 'column'
						}
						alignItems='center'
						justifyContent={
							selectedDurationOption.id === 'custom'
								? 'space-between'
								: 'center'
						}
					>
						<LView
							alignItems={
								selectedDurationOption.id === 'custom' ? 'flex-start' : 'center'
							}
							opacity={isEditingStartOrEnd === 'start' ? 1 : 0.6}
						>
							<LView>
								<Text
									variant='paragraph'
									color='text.q'
									marginBottom='xs'
									textDecorationLine='underline'
								>
									Start Date
								</Text>
							</LView>
							<LView>
								<Text variant={'section-header-1'} marginBottom='xs'>
									{dayjs(startDateTime).format('MMM. Do')}
								</Text>
							</LView>
							{selectedDurationOption.id === 'custom' && (
								<LView>
									<Text variant='paragraph'>
										{dayjs(startDateTime).format('h:mma')}
									</Text>
								</LView>
							)}
						</LView>
						{currentDuration && (
							<LView alignItems='center'>
								<Text
									variant='paragraph-medium'
									color='text.s'
									marginBottom='xs'
								>
									{formatDuration(startDateTime, endDateTime!, 'minute')}
								</Text>
							</LView>
						)}
						{selectedDurationOption.id === 'custom' && (
							<LView>
								<View
									alignItems='flex-end'
									opacity={isEditingStartOrEnd === 'end' ? 1 : 0.6}
								>
									<LView>
										<Text
											variant='paragraph'
											color='text.q'
											marginBottom='xs'
											textDecorationLine='underline'
										>
											End Date
										</Text>
									</LView>
									<LView>
										<Text
											variant={
												selectedDurationOption.id === 'custom'
													? 'section-header-1'
													: 'page-header'
											}
											marginBottom='xs'
										>
											{dayjs(endDateTime).format('MMM. Do')}
										</Text>
									</LView>
									<LView>
										<Text variant='paragraph'>
											{dayjs(endDateTime).format('h:mma')}
										</Text>
									</LView>
								</View>
							</LView>
						)}
					</LView>
				</LView>
				<LView>{/* <DateTimePicker {...datePickerOptions} /> */}</LView>
				<LView flex={1} margin='m' style={{ marginBottom: insets.bottom }}>
					{selectedDurationOption.id === 'custom' && (
						<LView>
							<PillGroup
								alignItems='center'
								justifyContent='center'
								paddingTop='m'
							>
								<LView>
									<TogglePill
										text='Start Time'
										isActive={isEditingStartOrEnd === 'start'}
										onPress={() => setIsEditingStartOrEnd('start')}
									/>
								</LView>
								<LView>
									<TogglePill
										text='End Time'
										isActive={isEditingStartOrEnd === 'end'}
										onPress={() => setIsEditingStartOrEnd('end')}
									/>
								</LView>
							</PillGroup>
						</LView>
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
								{
									text: 'cancel',
									variant: 'outlined',
									onPress: sheetApi.close
								},
								{ text: 'save', color: 'p', onPress: _onPressSave }
							]}
						/>
					</LView>
				</LView>
			</BottomSheetScrollView>
		</BottomSheet>
	);
};

export default SelectEventDateTimeBottomSheet;
