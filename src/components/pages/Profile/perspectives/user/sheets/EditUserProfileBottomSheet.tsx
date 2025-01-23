import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { DismissKeyboardWrapper, ScrollView, View } from '@atomic';
import { capitalizeFirstLetter } from '@etc';
import { userApiSlice } from '@flux/api/user';
import { UpdateUserBodyDto } from '@flux/api/user/dto/user-update.dto';
import { SheetApi } from '@hooks';
import {
	EditableProfileImage,
	TextInputWithLabel,
	useButtonState
} from '@molecules';
import { FullScreenSheet } from '@organisms';
import { ThemeModeSettings, ThemePicker } from '@templates';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';

interface EditUserProfileBottomSheetProps {
	sheetApi: SheetApi;
}

const EditUserProfileBottomSheet: React.FC<EditUserProfileBottomSheetProps> = ({
	sheetApi
}) => {
	const [updateUserMutation] = userApiSlice.useUpdateUserMutation();
	const { userData, setUserProfileImage } = useUserAppContext();
	const { buttonState, setButtonState } = useButtonState();

	const {
		reset,
		handleSubmit,
		control,
		formState: { isValid }
	} = useForm<UpdateUserBodyDto>({
		defaultValues: {
			handle: userData.handle
		}
	});

	useEffect(() => {
		setButtonState(isValid ? 'active' : 'disabled');
	}, [isValid]);

	const onSubmit = (data: UpdateUserBodyDto) => {
		setButtonState('loading');
		updateUserMutation({ body: data })
			.unwrap()
			.then(() => {
				Toast.show({
					text1: 'Your profile has been updated',
					text2: `@${data.handle}`,
					props: { icon: 'user' }
				});
				sheetApi.close();
			})
			.catch((err: any) => {
				setButtonState('active');
				if (err?.data?.error === 'UNIQUE_CONSTRAINT_EXCEPTION') {
					const key = err.data.uniqueExceptionDetails?.key || 'Unknown';
					Toast.show({
						text1: `${capitalizeFirstLetter(key)} already exists 😭`,
						text2: 'Try a different handle'
					});
				} else {
					Toast.show({
						text1: 'Something went wrong 💔',
						text2: 'Please try again'
					});
				}
			});
	};

	const resetAll = () => {
		reset();
		setButtonState('disabled');
	};

	return (
		<FullScreenSheet
			sheetApi={sheetApi}
			onDismiss={resetAll}
			buttonProps={[
				{
					text: 'Cancel',
					variant: 'outlined',
					onPress: sheetApi.close
				},
				{
					text: 'Save',
					onPress: handleSubmit(onSubmit),
					buttonState
				}
			]}
		>
			<ScrollView>
				<DismissKeyboardWrapper>
					<View margin='m' justifyContent='center' alignItems='center'>
						<EditableProfileImage
							image={userData.profile_image?.small.key}
							onChooseImage={setUserProfileImage}
						/>
					</View>
					<View margin='m'>
						<Controller
							name='handle'
							control={control}
							rules={{
								required: 'Handle is required',
								minLength: {
									value: 3,
									message: 'Handle must be at least 3 characters long'
								},
								pattern: {
									value: /^[a-zA-Z0-9_]+$/,
									message:
										'Handle can only contain letters, numbers, and underscores'
								},
								validate: (value) =>
									value.length >= 3 ||
									'Handle must be at least 3 characters long'
							}}
							render={({ field: { onChange } }) => (
								<TextInputWithLabel
									autoCapitalize='none'
									label='Handle'
									placeholder={userData.handle}
									onChangeText={onChange}
								/>
							)}
						/>
					</View>
					<ThemePicker />
					<ThemeModeSettings />
				</DismissKeyboardWrapper>
			</ScrollView>
		</FullScreenSheet>
	);
};

export default EditUserProfileBottomSheet;
