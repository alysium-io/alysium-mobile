import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Text, View } from '@atomic';
import { Formatting } from '@etc';
import { contactApiSlice } from '@flux/api/contact';
import { UpdateContactBodyDto } from '@flux/api/contact/dto/contact-update.dto';
import { useKeyboard, useNavigation } from '@hooks';
import { FormPhoneNumber, FormText } from '@molecules';
import { BasePage } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { captureException } from '@sentry/react-native';
import { Alert, useGlobalLoader } from '@templates';
import { EditContactPageRouteProp } from '@types';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import EditContactPageHeader from './EditContact.header';

const EditContactPage = () => {
	const route = useRoute<EditContactPageRouteProp>();
	const { back } = useNavigation();
	const { artistData } = useArtistAppContext();
	const [deleteContactMutation] = contactApiSlice.useDeleteContactMutation();
	const [updateContactMutation] = contactApiSlice.useUpdateContactMutation();
	const { dismiss } = useKeyboard();
	const { showLoader, hideLoader } = useGlobalLoader();

	const {
		control,
		handleSubmit,
		formState: { isDirty, isValid }
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
			showLoader();
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
				.catch((err) => {
					captureException(err);
					Toast.show({
						text1: 'Error',
						text2: 'Failed to update contact.'
					});
				})
				.finally(() => {
					hideLoader();
					back();
				});
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
							showLoader();
							await deleteContactMutation({
								params: {
									contact_uid: route.params.contact.contact_uid,
									artist_uid: artistData.artist_uid
								}
							});
						} catch {
							Toast.show({
								text1: 'Error',
								text2: 'Failed to delete contact.'
							});
						} finally {
							hideLoader();
							back();
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

	return (
		<BasePage>
			<EditContactPageHeader
				onCancel={onCancel}
				onSubmit={handleSubmit(onSubmit)}
				isValid={isValid}
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
								focusConfig={{ focusOnMount: true }}
								onPressClear={() => onChange('')}
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
								onPressClear={() => onChange('')}
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
								onPressClear={() => onChange('')}
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
									onPressClear={() => onChange('')}
									label='Email'
									placeholder='johnsmith@gmail.com'
									value={value ?? undefined}
									onChangeText={onChange}
								/>
							);
						}}
					/>
					<TouchableOpacity onPress={onDelete}>
						<View marginTop='l'>
							<Text
								color='danger'
								variant='paragraph-medium'
								textAlign='center'
							>
								Delete Contact
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</BasePage>
	);
};

export default EditContactPage;
