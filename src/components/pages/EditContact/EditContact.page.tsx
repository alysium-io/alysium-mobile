import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { View } from '@atomic';
import { Formatting } from '@etc';
import { contactApiSlice } from '@flux/api/contact';
import { UpdateContactBodyDto } from '@flux/api/contact/dto/contact-update.dto';
import { useKeyboard, useNavigation, useSheet, useToast } from '@hooks';
import {
	ActionButtons,
	FormPhoneNumber,
	FormText,
	useButtonState
} from '@molecules';
import { BasePage } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { EditContactPageRouteProp } from '@types';
import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, ScrollView } from 'react-native';
import EditContactPageHeader from './EditContact.header';
import PopupMenuSheet from './sheets/PopupMenuSheet';

const EditContactPage = () => {
	const route = useRoute<EditContactPageRouteProp>();
	const { back } = useNavigation();
	const { toastError } = useToast();
	const { artistData } = useArtistAppContext();
	const [deleteContactMutation] = contactApiSlice.useDeleteContactMutation();
	const [updateContactMutation] = contactApiSlice.useUpdateContactMutation();
	const saveButtonStateApi = useButtonState();
	const deleteButtonStateApi = useButtonState();
	const { dismiss } = useKeyboard();
	const popupMenuSheetApi = useSheet();

	const {
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
			saveButtonStateApi.setButtonState('loading');
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
				.finally(() => saveButtonStateApi.reset());
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
							deleteButtonStateApi.setButtonState('loading');
							await deleteContactMutation({
								params: {
									contact_uid: route.params.contact.contact_uid,
									artist_uid: artistData.artist_uid
								}
							});
							back();
						} catch {
							toastError('Failed to delete contact');
							deleteButtonStateApi.setButtonState('active');
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

	const FooterComponent = useCallback(
		() => (
			<View margin='m'>
				<ActionButtons
					buttonProps={[
						{
							text: 'Delete',
							onPress: onDelete,
							variant: 'outlined',
							color: 't',
							buttonState: deleteButtonStateApi.buttonState
						},
						{
							text: 'Save',
							onPress: handleSubmit(onSubmit),
							buttonState: saveButtonStateApi.buttonState
						}
					]}
				/>
			</View>
		),
		[onSubmit, saveButtonStateApi.buttonState, deleteButtonStateApi.buttonState]
	);

	return (
		<BasePage FooterComponent={FooterComponent}>
			<EditContactPageHeader
				onCancel={onCancel}
				popupMenuSheetApi={popupMenuSheetApi}
			/>
			<ScrollView onScrollBeginDrag={dismiss}>
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
			</ScrollView>
			<PopupMenuSheet sheetApi={popupMenuSheetApi} />
		</BasePage>
	);
};

export default EditContactPage;
