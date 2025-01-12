import { usePersonaAppContext } from '@arch/Application/contexts/Persona.context';
import { Text, View } from '@atomic';
import { artistApiSlice } from '@flux/api/artist';
import { CreateArtistBodyDto } from '@flux/api/artist/dto/artist-create.dto';
import { SheetApi } from '@hooks';
import { TextBox, useButtonState } from '@molecules';
import { FullScreenSheet } from '@organisms';
import { Persona } from '@types';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';

interface CreateArtistBottomSheetProps {
	sheetApi: SheetApi;
}

const CreateArtistBottomSheet: React.FC<CreateArtistBottomSheetProps> = ({
	sheetApi
}) => {
	const [createArtistMutation] = artistApiSlice.useCreateArtistMutation();
	const { setButtonState, buttonState } = useButtonState('disabled');
	const { changePersona } = usePersonaAppContext();

	const {
		handleSubmit,
		reset,
		control,
		formState: { isValid }
	} = useForm<CreateArtistBodyDto>();

	useEffect(() => {
		setButtonState(isValid ? 'active' : 'disabled');
	}, [isValid]);

	const resetAll = () => {
		setButtonState('disabled');
		reset();
	};

	const onSubmit = (data: CreateArtistBodyDto) => {
		setButtonState('loading');
		createArtistMutation({ body: data })
			.unwrap()
			.then((data) => {
				sheetApi.close();
				setTimeout(() => {
					changePersona(Persona.artist, data.artist_uid);
				}, 300);
			})
			.catch((err) => {
				Toast.show({
					text1: 'Error creating artist',
					text2: 'Please try again'
				});
				setButtonState('active');
			});
	};

	return (
		<FullScreenSheet
			sheetApi={sheetApi}
			onDismiss={resetAll}
			buttonProps={[
				{
					text: 'cancel',
					variant: 'outlined',
					onPress: sheetApi.close
				},
				{
					text: 'Create',
					onPress: handleSubmit(onSubmit),
					color: 'p',
					buttonState: buttonState
				}
			]}
		>
			<View margin='m'>
				<Text marginBottom='m' marginLeft='s' marginTop='m'>
					Artist Name
				</Text>
				<Controller
					name='name'
					control={control}
					rules={{ required: 'Name is required' }}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextBox
							focusOnMount
							onChangeText={onChange}
							onBlur={onBlur}
							placeholder='Name'
							subtitle='This field is required.'
							value={value}
						/>
					)}
				/>
			</View>
		</FullScreenSheet>
	);
};

export default CreateArtistBottomSheet;
