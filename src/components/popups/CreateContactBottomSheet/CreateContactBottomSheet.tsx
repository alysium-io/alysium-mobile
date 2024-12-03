import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { DismissKeyboardWrapper, View } from '@atomic';
import { Formatting } from '@etc';
import { contactApiSlice } from '@flux/api/contact';
import { CreateContactBodyDto } from '@flux/api/contact/dto/contact-create.dto';
import { BottomSheetFooterProps } from '@gorhom/bottom-sheet';
import { SheetApi, useSheet, useToast } from '@hooks';
import {
	ActionButtons,
	Button,
	FormPhoneNumber,
	FormText,
	useButtonState
} from '@molecules';
import { FullScreenSheet, FullScreenSheetStandardHeader } from '@organisms';
import FullScreenSheetFooter from '@src/components/organisms/BottomSheet/sheets/FullScreenSheetFooter';
import React, { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Contact } from 'react-native-contacts/type';
import { ContactPickerBottomSheet } from '../ContactPickerBottomSheet';

interface CreateContactBottomSheetProps {
	sheetApi: SheetApi;
}

const CreateContactBottomSheet: React.FC<CreateContactBottomSheetProps> = ({
	sheetApi
}) => {
	const contactPickerSheetApi = useSheet();
	const { toastError } = useToast();
	const { artistData } = useArtistAppContext();
	const [createContactMutation] = contactApiSlice.useCreateContactMutation();
	const {
		setButtonState,
		buttonState,
		reset: resetButtonState
	} = useButtonState('disabled');

	const {
		handleSubmit,
		setValue,
		control,
		reset: resetForm,
		formState: { isValid }
	} = useForm<CreateContactBodyDto>({
		defaultValues: {
			name: '',
			role: null,
			phone_number: null,
			email: null
		}
	});

	useEffect(() => {
		setButtonState(isValid ? 'active' : 'disabled');
	}, [isValid]);

	const reset = () => {
		resetButtonState();
		resetForm();
	};

	const onSubmit = async (data: CreateContactBodyDto) => {
		setButtonState('loading');
		createContactMutation({
			params: { artist_uid: artistData.artist_uid },
			body: {
				...data,
				phone_number: Formatting.preparePhoneNumberForApi(data.phone_number)
			}
		})
			.unwrap()
			.then(sheetApi.close)
			.catch(toastError)
			.finally(() => setButtonState('active'));
	};

	const onImportContact = (contact: Contact) => {
		const name = contact.givenName + ' ' + contact.familyName;
		const phone_number = contact.phoneNumbers[0]?.number;
		const email = contact.emailAddresses[0]?.email;
		setValue('name', name, { shouldValidate: true });
		setValue('phone_number', Formatting.formatPhoneNumber(phone_number), {
			shouldValidate: true
		});
		setValue('email', email, { shouldValidate: true });
	};

	const footerComponent = useCallback(
		(props: BottomSheetFooterProps) => {
			return (
				<FullScreenSheetFooter {...props}>
					<View flex={1}>
						<ActionButtons
							buttonProps={[
								{
									text: 'Cancel',
									color: 'default',
									variant: 'outlined',
									onPress: sheetApi.close
								},
								{
									text: 'Save',
									color: 'default',
									onPress: handleSubmit(onSubmit),
									buttonState: buttonState
								}
							]}
						/>
					</View>
				</FullScreenSheetFooter>
			);
		},
		[buttonState]
	);

	return (
		<FullScreenSheet
			sheetApi={sheetApi}
			footerComponent={footerComponent}
			onDismiss={reset}
		>
			<FullScreenSheetStandardHeader />
			<DismissKeyboardWrapper>
				<View margin='m'>
					<Controller
						control={control}
						name='name'
						rules={{
							required: 'Must enter a name',
							maxLength: { value: 50, message: 'Name is too long' }
						}}
						render={({ field: { onChange, value } }) => (
							<FormText
								label='Name'
								placeholder='John Smith'
								onChangeText={onChange}
								defaultValue={value}
								value={value}
							/>
						)}
					/>
					<Controller
						control={control}
						name='role'
						render={({ field: { onChange, value } }) => (
							<FormText
								label='Role'
								placeholder='Manager, booking agent, etc.'
								onChangeText={onChange}
								value={value ?? undefined}
							/>
						)}
					/>
					<Controller
						control={control}
						name='phone_number'
						render={({ field: { onChange, value } }) => (
							<FormPhoneNumber
								label='Phone'
								onChangeText={onChange}
								value={Formatting.formatPhoneNumber(value) ?? undefined}
							/>
						)}
					/>
					<Controller
						control={control}
						name='email'
						render={({ field: { onChange, value } }) => (
							<FormText
								label='Email'
								placeholder='johnsmith@gmail.com'
								onChangeText={onChange}
								defaultValue={value ?? undefined}
								value={value ?? undefined}
							/>
						)}
					/>
				</View>
				<View margin='m'>
					<Button
						onPress={contactPickerSheetApi.open}
						text='Import from Contacts'
					/>
				</View>
			</DismissKeyboardWrapper>
			<ContactPickerBottomSheet
				sheetApi={contactPickerSheetApi}
				onSelect={onImportContact}
			/>
		</FullScreenSheet>
	);
};

export default CreateContactBottomSheet;
