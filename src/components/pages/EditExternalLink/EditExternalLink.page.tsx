import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Text, View } from '@atomic';
import { externalUrlApiSlice } from '@flux/api/external-url';
import { UpdateExternalUrlBodyDto } from '@flux/api/external-url/dto/external-url-update.dto';
import { useNavigation } from '@hooks';
import { FormText } from '@molecules';
import { BasePage } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { getIconFromUrl } from '@src/etc/domains';
import { IconNames } from '@svg';
import { Alert, useGlobalLoader } from '@templates';
import { EditExternalLinkPageRouteProp } from '@types';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import EditExternalLinkPageHeader from './EditExternalLink.header';

const EditExternalLinkPage = () => {
	const { showLoader, hideLoader } = useGlobalLoader();
	const route = useRoute<EditExternalLinkPageRouteProp>();
	const { back } = useNavigation();
	const [deleteExternalUrlMutation] =
		externalUrlApiSlice.useDeleteExternalUrlMutation();
	const [updateExternalUrlMutation] =
		externalUrlApiSlice.useUpdateExternalUrlMutation();
	const { artistData } = useArtistAppContext();
	const [domainIcon, setDomainIcon] = useState<IconNames>('link');

	const {
		control,
		watch,
		handleSubmit,
		formState: { isDirty }
	} = useForm<UpdateExternalUrlBodyDto>({
		defaultValues: {
			name: route.params.externalLink.name,
			url: route.params.externalLink.url
		}
	});

	useEffect(() => {
		const url = watch('url');
		setDomainIcon(getIconFromUrl(url));
	}, [watch('url')]);

	const onSubmit = (data: UpdateExternalUrlBodyDto) => {
		showLoader();
		updateExternalUrlMutation({
			params: {
				artist_uid: artistData.artist_uid,
				external_url_uid: route.params.externalLink.external_url_uid
			},
			body: data
		})
			.unwrap()
			.catch(() => {
				Toast.show({
					text1: 'Error',
					text2: 'Failed to update external link.'
				});
			})
			.finally(() => {
				hideLoader();
				back();
			});
	};

	const onCancel = () => {
		if (isDirty) {
			Alert.alert(
				'Discard changes?',
				'You have unsaved changes. Are you sure you want to discard them?',
				[
					{
						text: 'Cancel',
						style: 'accent'
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

	const onDelete = async () => {
		Alert.alert('Delete link?', 'Are you sure you want to delete this link?', [
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
						await deleteExternalUrlMutation({
							params: {
								artist_uid: artistData.artist_uid,
								external_url_uid: route.params.externalLink.external_url_uid
							}
						});
					} catch {
						Toast.show({
							text1: 'Error',
							text2: 'Failed to delete external link.'
						});
					} finally {
						hideLoader();
						back();
					}
				}
			}
		]);
	};

	return (
		<BasePage>
			<EditExternalLinkPageHeader
				onCancel={onCancel}
				onSubmit={handleSubmit(onSubmit)}
				domainIcon={domainIcon}
			/>
			<View margin='m'>
				<Controller
					control={control}
					name='url'
					rules={{
						required: 'Must enter a url'
					}}
					render={({ field: { onChange, value } }) => (
						<FormText
							focusConfig={{ focusOnMount: true }}
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
						required: 'Must enter a name',
						maxLength: { value: 50, message: 'Name is too long' }
					}}
					render={({ field: { onChange, value } }) => (
						<FormText
							onPressClear={() => onChange('')}
							label='Name'
							placeholder='John Smith'
							onChangeText={onChange}
							value={value}
						/>
					)}
				/>
				<TouchableOpacity onPress={onDelete}>
					<View marginTop='l'>
						<Text color='danger' variant='paragraph-medium' textAlign='center'>
							Delete Link
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		</BasePage>
	);
};

export default EditExternalLinkPage;
