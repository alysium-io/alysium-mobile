import { Text, View } from '@atomic';
import { UpdateTicketTypeBodyDto } from '@flux/api/ticket-type/dto/ticket-type-update.dto';
import { SheetApi } from '@hooks';
import { MenuListItem } from '@organisms';
import {
	EditTicketTypeEndSaleBottomSheet,
	EditTicketTypeOnSaleBottomSheet
} from '@popups';
import day from 'dayjs';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

interface EditOnOffSaleTimesProps {
	onChangeStartSaleTime: (date: Date | null) => void;
	onChangeEndSaleTime: (date: Date | null) => void;
	formMethods: UseFormReturn<UpdateTicketTypeBodyDto>;
	editTicketTypeOnSaleSheetApi: SheetApi;
	editTicketTypeEndSaleSheetApi: SheetApi;
}

const EditOnOffSaleTimes: React.FC<EditOnOffSaleTimesProps> = ({
	onChangeStartSaleTime,
	onChangeEndSaleTime,
	formMethods,
	editTicketTypeOnSaleSheetApi,
	editTicketTypeEndSaleSheetApi
}) => {
	return (
		<View marginVertical='m'>
			<Controller
				name='sale_start_time'
				control={formMethods.control}
				render={({ field: { value } }) => (
					<MenuListItem
						title='Sale Start'
						secondaryText={
							value ? day(value).format('MMM D, h:mma') : 'On Event Publish'
						}
						onPress={editTicketTypeOnSaleSheetApi.open}
						color='ion'
					/>
				)}
			/>
			<Controller
				name='sale_end_time'
				control={formMethods.control}
				render={({ field: { value } }) => (
					<MenuListItem
						title='Sale End'
						secondaryText={
							value ? day(value).format('MMM D, h:mma') : 'On Event End'
						}
						onPress={editTicketTypeEndSaleSheetApi.open}
						color='ion'
						border={false}
					/>
				)}
			/>
			<Text variant='paragraph-small' marginHorizontal='m' color='t3'>
				When do tickets come on/off sale?
			</Text>
			<EditTicketTypeOnSaleBottomSheet
				sheetApi={editTicketTypeOnSaleSheetApi}
				formMethods={formMethods}
				onChangeStartSaleTime={onChangeStartSaleTime}
				dateValue={formMethods.watch('sale_start_time')}
			/>
			<EditTicketTypeEndSaleBottomSheet
				sheetApi={editTicketTypeEndSaleSheetApi}
				formMethods={formMethods}
				onChangeEndSaleTime={onChangeEndSaleTime}
				dateValue={formMethods.watch('sale_end_time')}
			/>
		</View>
	);
};

export default EditOnOffSaleTimes;
