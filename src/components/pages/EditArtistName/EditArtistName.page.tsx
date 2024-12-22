import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { View } from '@atomic';
import { artistApiSlice } from '@flux/api/artist';
import { UpdateArtistBodyDto } from '@flux/api/artist/dto/artist-update.dto';
import { useNavigation, useToast } from '@hooks';
import { FormText } from '@molecules';
import { BasePage } from '@organisms';
import { Alert, useGlobalLoader } from '@templates';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import EditArtistNamePageHeader from './EditArtistName.header';

const EditArtistName = () => {
	const { artistData } = useArtistAppContext();
	const { showLoader, hideLoader } = useGlobalLoader();
	const { toastError } = useToast();
	const { back } = useNavigation();
	const [updateArtistMutation] = artistApiSlice.useUpdateArtistMutation();

	const {
		control,
		handleSubmit,
		formState: { isDirty }
	} = useForm<UpdateArtistBodyDto>({
		defaultValues: {
			name: artistData.name
		}
	});

	const onSubmit = (data: UpdateArtistBodyDto) => {
		showLoader();
		updateArtistMutation({
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

	const onInvalid = () => {
		toastError('Please enter a name');
	};

	return (
		<BasePage>
			<EditArtistNamePageHeader
				onCancel={onCancel}
				onSubmit={handleSubmit(onSubmit, onInvalid)}
			/>
			<ScrollView>
				<View margin='m'>
					<Controller
						control={control}
						name='name'
						rules={{
							required: 'Must enter a name'
						}}
						render={({ field: { onChange, value } }) => (
							<FormText
								focusOnMount
								onPressClear={() => onChange('')}
								label='Name'
								placeholder={artistData.name}
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

export default EditArtistName;
