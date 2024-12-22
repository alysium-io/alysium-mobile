import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { ScrollView, View } from '@atomic';
import { externalUrlApiSlice } from '@flux/api/external-url';
import { CreateExternalUrlBodyDto } from '@flux/api/external-url/dto/external-url-create.dto';
import { useNavigation, useToast } from '@hooks';
import { FormText } from '@molecules';
import { BasePage } from '@organisms';
import { getIconFromUrl } from '@src/etc/domains';
import { IconNames } from '@svg';
import { Alert, useGlobalLoader } from '@templates';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import CreateExternalLinkPageHeader from './CreateExternalLink.header';

const CreateExternalLinkPage = () => {
	const { back } = useNavigation();
	const { toastError } = useToast();
	const [createExternalUrlMutation] =
		externalUrlApiSlice.useCreateExternalUrlMutation();
	const { artistData } = useArtistAppContext();
	const [domainIcon, setDomainIcon] = useState<IconNames>('link');
	const { showLoader, hideLoader } = useGlobalLoader();

	const {
		control,
		watch,
		handleSubmit,
		formState: { isDirty, isValid }
	} = useForm<CreateExternalUrlBodyDto>({
		defaultValues: {
			name: '',
			url: ''
		}
	});

	useEffect(() => {
		const url = watch('url');
		if (url.length) {
			setDomainIcon(getIconFromUrl(url));
		}
	}, [watch('url')]);

	const onSubmit = (data: CreateExternalUrlBodyDto) => {
		if (isDirty) {
			showLoader();
			createExternalUrlMutation({
				params: {
					artist_uid: artistData.artist_uid
				},
				body: data
			})
				.unwrap()
				.catch(toastError)
				.finally(() => {
					hideLoader();
					back();
				});
		} else {
			back();
		}
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
			<CreateExternalLinkPageHeader
				onCancel={onCancel}
				onSubmit={handleSubmit(onSubmit)}
				isValid={isValid}
				domainIcon={domainIcon}
			/>
			<ScrollView>
				<View margin='m'>
					<Controller
						control={control}
						name='url'
						rules={{
							required: 'You must enter a url'
						}}
						render={({ field: { onChange, value } }) => (
							<FormText
								focusOnMount
								onPressClear={() => onChange('')}
								label='Url'
								placeholder='https://instagram.com/your-page'
								onChangeText={onChange}
								value={value}
								keyboardType='url'
								autoCapitalize='none'
							/>
						)}
					/>
					<Controller
						control={control}
						name='name'
						rules={{
							required: 'You must enter a name',
							maxLength: { value: 50, message: 'Name is too long' }
						}}
						render={({ field: { onChange, value } }) => (
							<FormText
								onPressClear={() => onChange('')}
								label='Name'
								placeholder='Name'
								onChangeText={onChange}
								value={value}
							/>
						)}
					/>
				</View>
			</ScrollView>
		</BasePage>
	);
};

export default CreateExternalLinkPage;
