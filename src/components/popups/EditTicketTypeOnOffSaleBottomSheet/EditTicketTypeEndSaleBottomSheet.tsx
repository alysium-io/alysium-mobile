import { UpdateTicketTypeBodyDto } from '@flux/api/ticket-type/dto/ticket-type-update.dto';
import { SheetApi } from '@hooks';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import BottomButtons from './components/BottomButtons';
import Container from './components/Container';
import SelectDateSection from './components/SelectDateSection';

interface EditTicketTypeEndSaleBottomSheetProps {
	sheetApi: SheetApi;
	formMethods: UseFormReturn<UpdateTicketTypeBodyDto>;
	onChangeEndSaleTime: (date: Date | null) => void;
	dateValue: string | null;
}

const EditTicketTypeEndSaleBottomSheet: React.FC<
	EditTicketTypeEndSaleBottomSheetProps
> = ({ sheetApi, formMethods, onChangeEndSaleTime, dateValue }) => {
	return (
		<Container sheetApi={sheetApi}>
			<SelectDateSection
				controllerFieldName='sale_end_time'
				dateValue={dateValue}
				onChange={onChangeEndSaleTime}
				formMethods={formMethods}
				title='Sale End'
				notSchedulingText='When should this ticket come off sale?'
			/>
			<BottomButtons
				sheetApi={sheetApi}
				onChange={onChangeEndSaleTime}
				dateValue={dateValue}
				defaultNewDate={new Date()}
				notSchedulingSubtitle='This ticket type will come off sale when the event is over.'
				schedulingSubtitle='When should this ticket come off sale?'
			/>
		</Container>
	);
};

export default EditTicketTypeEndSaleBottomSheet;
