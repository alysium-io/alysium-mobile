import { Text, View } from '@atomic';
import { BottomSheetFooterProps } from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import { PillGroup } from '@molecules';
import { FullScreenSheet, FullScreenSheetStandardHeader } from '@organisms';
import ActionButtons from '@src/components/molecules/Buttons/ActionButtons';
import TogglePill from '@src/components/molecules/Pills/TogglePill';
import FullScreenSheetContainer from '@src/components/organisms/BottomSheet/sheets/FullScreenSheetContainer';
import FullScreenSheetFooter from '@src/components/organisms/BottomSheet/sheets/FullScreenSheetFooter';
import { useEventTiming } from '@src/utils/hooks/useEventTiming';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import React, { useCallback } from 'react';
import { LinearTransition } from 'react-native-reanimated';
import DefaultDatePicker from './components/DefaultDatePicker';
import { formatDuration } from './components/formatDuration';
day.extend(advancedFormat);

interface SelectEventDateTimeBottomSheetProps {
	sheetApi: SheetApi;
	defaultStartDateTime: Date | null;
	defaultEndDateTime?: Date | null;
	onPressSave?: (startDateTime: Date, endDateTime: Date | null) => void;
}

const SelectEventDateTimeBottomSheet: React.FC<
	SelectEventDateTimeBottomSheetProps
> = ({ sheetApi, defaultStartDateTime, defaultEndDateTime, onPressSave }) => {
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
	} = useEventTiming({
		startDateTime: defaultStartDateTime,
		endDateTime: defaultEndDateTime
	});

	const _onPressSave = () => {
		sheetApi.close();
		onPressSave && onPressSave(startDateTime, endDateTime);
	};

	const footerComponent = useCallback(
		(props: BottomSheetFooterProps) => (
			<FullScreenSheetFooter containerProps={{ paddingTop: 'none' }} {...props}>
				<View flex={1}>
					{selectedDurationOption.id === 'custom' && (
						<PillGroup
							alignItems='center'
							justifyContent='center'
							paddingTop='m'
						>
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
					<ActionButtons
						buttonProps={[
							{ text: 'cancel', variant: 'outlined', onPress: sheetApi.close },
							{ text: 'save', color: 'p', onPress: _onPressSave }
						]}
					/>
				</View>
			</FullScreenSheetFooter>
		),
		[
			durationOptions,
			isEditingStartOrEnd,
			selectedDurationOption.id,
			setIsEditingStartOrEnd,
			setSelectedDurationOption
		]
	);

	return (
		<FullScreenSheet sheetApi={sheetApi} footerComponent={footerComponent}>
			<FullScreenSheetContainer animated layout={LinearTransition}>
				<FullScreenSheetStandardHeader />
				<View flex={1} justifyContent='space-between'>
					<View margin='m'>
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
									<Text
										variant='paragraph-large'
										color='text.s'
										textAlign='right'
									>
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
				</View>
			</FullScreenSheetContainer>
		</FullScreenSheet>
	);
};

export default SelectEventDateTimeBottomSheet;
