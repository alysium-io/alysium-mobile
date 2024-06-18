import { UpdateTicketTypeBodyDto } from '@flux/api/ticket-type/dto/ticket-type-update.dto';
import { SheetApi } from '@hooks';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import BottomButtons from './components/BottomButtons';
import Container from './components/Container';
import SelectDateSection from './components/SelectDateSection';

interface EditTicketTypeOnSaleBottomSheetProps {
	sheetApi: SheetApi;
	formMethods: UseFormReturn<UpdateTicketTypeBodyDto>;
	onChangeStartSaleTime: (date: Date | null) => void;
	dateValue: string | null;
}

const EditTicketTypeOnSaleBottomSheet: React.FC<
	EditTicketTypeOnSaleBottomSheetProps
> = ({ sheetApi, formMethods, onChangeStartSaleTime, dateValue }) => {
	return (
		<Container sheetApi={sheetApi}>
			<SelectDateSection
				controllerFieldName='sale_start_time'
				dateValue={dateValue}
				onChange={onChangeStartSaleTime}
				formMethods={formMethods}
				title='Sale Start'
				notSchedulingText='This ticket type will go on sale immediately when the event is published.'
			/>
			<BottomButtons
				sheetApi={sheetApi}
				onChange={onChangeStartSaleTime}
				dateValue={dateValue}
				defaultNewDate={new Date()}
				notSchedulingSubtitle='You must publish the event before tickets will be available for sale.'
				schedulingSubtitle='When should this ticket become available for fans to purchase?'
			/>
		</Container>
	);
};

export default EditTicketTypeOnSaleBottomSheet;
