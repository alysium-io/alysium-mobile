import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { ScrollView, Text, View } from '@atomic';
import { Formatting } from '@etc';
import { contactApiSlice } from '@flux/api/contact';
import { CreateContactBodyDto } from '@flux/api/contact/dto/contact-create.dto';
import { useContact, useNavigation, useSearch } from '@hooks';
import { ContentListItem, FormPhoneNumber, FormText } from '@molecules';
import { BasePage, SearchBar } from '@organisms';
import { captureException } from '@sentry/react-native';
import { useGlobalLoader } from '@templates';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Contacts from 'react-native-contacts';
import { Contact } from 'react-native-contacts/type';
import Toast from 'react-native-toast-message';
import CreateContactPageHeader from './CreateContact.header';

const CreateContactPage = () => {
	const { back } = useNavigation();
	const { artistData } = useArtistAppContext();
	const [createContactMutation] = contactApiSlice.useCreateContactMutation();
	const { extractContact } = useContact();
	const { showLoader, hideLoader } = useGlobalLoader();
	const [searchResults, setSearchResults] = useState<Contact[]>([]);
	const searchApi = useSearch({
		methods: {
			onChangeText: (text) => {
				Contacts.getContactsMatchingString(text).then(setSearchResults);
			}
		}
	});

	const {
		handleSubmit,
		setValue,
		control,
		formState: { isValid }
	} = useForm<CreateContactBodyDto>({
		defaultValues: {
			name: '',
			role: null,
			phone_number: null,
			email: null
		}
	});

	const onImportContact = (contact: Contact) => {
		const _contact = extractContact(contact);
		setValue('name', _contact.name, { shouldValidate: true });
		setValue(
			'phone_number',
			Formatting.formatPhoneNumber(_contact.phone_number),
			{
				shouldValidate: true
			}
		);
		setValue('email', _contact.email, { shouldValidate: true });
		searchApi.pressDeactivate();
	};

	const onSubmit = async (data: CreateContactBodyDto) => {
		showLoader();
		createContactMutation({
			params: { artist_uid: artistData.artist_uid },
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
					text2: 'Failed to create contact.'
				});
			})
			.finally(() => {
				hideLoader();
				back();
			});
	};

	const onInvalid = (err: any) => {
		const defaultText = 'Please fill out all required fields';
		const errorKeys = Object.keys(err);
		if (errorKeys.length > 0) {
			Toast.show({
				text1: 'Error',
				text2: err[errorKeys[0]]?.message ?? defaultText
			});
			return;
		} else {
			Toast.show({
				text1: 'Error',
				text2: defaultText
			});
		}
	};

	return (
		<BasePage>
			<CreateContactPageHeader
				isValid={isValid}
				onSubmit={handleSubmit(onSubmit, onInvalid)}
			/>
			<ScrollView>
				<View margin='m' marginBottom='none'>
					<SearchBar searchApi={searchApi} placeholder='Search Contacts' />
					<Text variant='paragraph-small-medium' color='text.q' margin='s'>
						Import from your address book
					</Text>
				</View>
				{!searchApi.isEmpty && (
					<View>
						{searchResults.map((contact) => (
							<ContentListItem
								key={contact.recordID}
								titleTextProps={{
									title: contact.givenName + ' ' + contact.familyName,
									bottomSubtext: contact.phoneNumbers[0]?.number,
									bottomSubtextColor: 'text.q'
								}}
								profileImageProps={{
									image: contact.hasThumbnail
										? contact.thumbnailPath
										: undefined,
									defaultImageProps: {
										icon: 'user'
									}
								}}
								onPress={() => onImportContact(contact)}
							/>
						))}
					</View>
				)}
				{searchApi.isEmpty && (
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
				)}
			</ScrollView>
		</BasePage>
	);
};

export default CreateContactPage;
