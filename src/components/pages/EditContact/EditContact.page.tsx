import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { DismissKeyboardWrapper, View } from '@atomic';
import { Formatting } from '@etc';
import { contactApiSlice } from '@flux/api/contact';
import { UpdateContactBodyDto } from '@flux/api/contact/dto/contact-update.dto';
// TODO: Error useContactPicker is not exported by module
import { useContactPicker, useNavigation, useToast } from '@hooks';
import { Button, FormPhoneNumber, FormText, useButtonState } from '@molecules';
import { BasePage } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { EditContactPageRouteProp } from '@types';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import EditContactPageHeader from './EditContact.header';

const EditContactPage = () => {
	const route = useRoute<EditContactPageRouteProp>();
	const { back } = useNavigation();
	const { toastError } = useToast();
	const { artistData } = useArtistAppContext();
	const { pickContact } = useContactPicker();
	const [isLoading, setIsLoading] = useState(false);
	const [deleteContactMutation] = contactApiSlice.useDeleteContactMutation();
	const [updateContactMutation] = contactApiSlice.useUpdateContactMutation();
	const { setButtonState, buttonState } = useButtonState();

	const {
		setValue,
		control,
		handleSubmit,
		formState: { isDirty }
	} = useForm<UpdateContactBodyDto>({
		defaultValues: {
			name: route.params.contact.name,
			role: route.params.contact.role,
			phone_number: Formatting.formatPhoneNumber(
				route.params.contact.phone_number
			),
			email: route.params.contact.email
		}
	});

	const onSubmit = (data: UpdateContactBodyDto) => {
		if (isDirty) {
			setIsLoading(true);
			updateContactMutation({
				params: {
					artist_uid: artistData.artist_uid,
					contact_uid: route.params.contact.contact_uid
				},
				body: {
					...data,
					phone_number: Formatting.preparePhoneNumberForApi(data.phone_number)
				}
			})
				.unwrap()
				.then(back)
				.catch(toastError)
				.finally(() => setIsLoading(false));
		} else {
			back();
		}
	};

	const onDelete = async () => {
		Alert.alert(
			'Delete contact?',
			'Are you sure you want to delete this contact?',
			[
				{
					text: 'Cancel',
					style: 'cancel'
				},
				{
					text: 'Delete',
					style: 'destructive',
					onPress: async () => {
						try {
							setButtonState('loading');
							await deleteContactMutation({
								params: {
									contact_uid: route.params.contact.contact_uid,
									artist_uid: artistData.artist_uid
								}
							});
							back();
						} catch {
							toastError('Failed to delete contact');
							setButtonState('active');
						}
					}
				}
			]
		);
	};

	const onCancel = () => {
		if (isDirty) {
			Alert.alert(
				'Discard changes?',
				'You have unsaved changes. Are you sure you want to discard them?',
				[
					{
						text: 'Cancel',
						style: 'cancel'
					},
					{
						text: 'Discard',
						onPress: () => back(),
						style: 'destructive'
					}
				]
			);
		} else {
			back();
		}
	};

	const importFromContacts = async () => {
		const contact = await pickContact();
		if (contact) {
			setValue('name', contact.name, { shouldDirty: true });
			setValue(
				'phone_number',
				Formatting.formatPhoneNumber(contact.phone_number),
				{ shouldDirty: true }
			);
			setValue('email', contact.email, { shouldDirty: true });
		}
	};

	return (
		<BasePage>
			<EditContactPageHeader
				onCancel={onCancel}
				onSave={handleSubmit(onSubmit)}
				isLoading={isLoading}
			/>
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
								value={value}
							/>
						)}
					/>
					<Controller
						control={control}
						name='role'
						render={({ field: { value, onChange } }) => (
							<FormText
								label='Role'
								placeholder='Manager, booking agent, etc.'
								value={value ?? undefined}
								onChangeText={onChange}
							/>
						)}
					/>
					<Controller
						control={control}
						name='phone_number'
						render={({ field: { value, onChange } }) => (
							<FormPhoneNumber
								label='Phone'
								value={value ?? undefined}
								onChangeText={(text: string) =>
									onChange(Formatting.formatPhoneNumber(text))
								}
							/>
						)}
					/>
					<Controller
						control={control}
						name='email'
						render={({ field: { value, onChange } }) => {
							return (
								<FormText
									label='Email'
									placeholder='johnsmith@gmail.com'
									value={value ?? undefined}
									onChangeText={onChange}
								/>
							);
						}}
					/>
				</View>
				<View margin='m'>
					<Button onPress={importFromContacts} text='Import from Contacts' />
					<View marginTop='m'>
						<Button
							onPress={onDelete}
							text='Delete'
							variant='outlined'
							color='t'
							buttonState={buttonState}
						/>
					</View>
				</View>
			</DismissKeyboardWrapper>
		</BasePage>
	);
};

export default EditContactPage;
