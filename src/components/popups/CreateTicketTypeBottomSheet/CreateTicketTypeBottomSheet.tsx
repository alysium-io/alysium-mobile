import { DismissKeyboardWrapper } from '@atomic';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import { BottomSheet, Sequence, useAnimatedFooterHeight } from '@organisms';
import { ApiIdentifier } from '@types';
import React from 'react';
import EndSaleTime from './components/EndSaleTime';
import Footer from './components/Footer';
import Header from './components/Header';
import NumberOfTickets from './components/NumberOfTickets';
import OnSaleTime from './components/OnSaleTime';
import Price from './components/Price';
import Summary from './components/Summary';
import TicketName from './components/TicketName';
import useCreateTicketTypeBottomSheet from './useCreateTicketTypeBottomSheet';

interface CreateTicketTypeBottomSheetProps {
	sheetApi: SheetApi;
	ticket_collection_uid: ApiIdentifier;
}

const CreateTicketTypeBottomSheet: React.FC<
	CreateTicketTypeBottomSheetProps
> = ({ sheetApi, ticket_collection_uid }) => {
	const {
		sequenceApi,
		ticketTypeNameTextInputApi,
		numberOfTicketsTextInputApi,
		ticketPriceTextInputApi,
		resetAll,
		formMethods,
		title,
		setTitle,
		onChangeStartSaleTime,
		onChangeEndSaleTime,
		cancel,
		done,
		onSheetIndexChangeFocusTextInput
	} = useCreateTicketTypeBottomSheet(sheetApi, ticket_collection_uid);

	const { animatedMarginBottom } = useAnimatedFooterHeight();

	return (
		<BottomSheet
			sheetRef={sheetApi.sheetRef}
			snapPoints={['90%']}
			onDismiss={resetAll}
			onChange={onSheetIndexChangeFocusTextInput}
		>
			<DismissKeyboardWrapper>
				<BottomSheetView style={[{ flex: 1 }, animatedMarginBottom]}>
					<Header title={title} sequenceApi={sequenceApi} />
					<Sequence sequenceIndex={sequenceApi.sequenceIndex}>
						<TicketName
							formMethods={formMethods}
							ticketTypeNameTextInputApi={ticketTypeNameTextInputApi}
							setTitle={setTitle}
						/>
						<NumberOfTickets
							formMethods={formMethods}
							numberOfTicketsTextInputApi={numberOfTicketsTextInputApi}
						/>
						<Price
							formMethods={formMethods}
							ticketPriceTextInputApi={ticketPriceTextInputApi}
						/>
						<OnSaleTime
							formMethods={formMethods}
							onChangeStartSaleTime={onChangeStartSaleTime}
						/>
						<EndSaleTime
							formMethods={formMethods}
							onChangeEndSaleTime={onChangeEndSaleTime}
						/>
						<Summary formMethods={formMethods} />
					</Sequence>
				</BottomSheetView>
			</DismissKeyboardWrapper>
			<Footer
				cancel={cancel}
				done={done}
				sequenceApi={sequenceApi}
				formMethods={formMethods}
			/>
		</BottomSheet>
	);
};

export default CreateTicketTypeBottomSheet;
