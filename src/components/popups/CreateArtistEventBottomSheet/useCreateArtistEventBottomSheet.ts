import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { artistEventApiSlice } from '@flux/api/event';
import { CreateArtistEventBodyDto } from '@flux/api/event/dto/artist-event-create.dto';
import { SheetApi, useNavigation, useToast } from '@hooks';
import { ButtonState, useButtonState } from '@molecules';
import { useEffect } from 'react';
import { Control, useForm } from 'react-hook-form';

interface IuseCreateArtistEventBottomSheet {
	close: () => void;
	resetAll: () => void;
	onSubmit: () => void;
	control: Control<CreateArtistEventBodyDto>;
	buttonState: ButtonState;
}

const useCreateArtistEventBottomSheet = (
	sheetApi: SheetApi
): IuseCreateArtistEventBottomSheet => {
	const { toastError } = useToast();

	const {
		setButtonState,
		reset: resetButtonState,
		buttonState
	} = useButtonState('disabled');
	const { manageEventPage } = useNavigation();
	const { artistData } = useArtistAppContext();
	const [createArtistEventMutation] =
		artistEventApiSlice.useCreateArtistEventMutation();

	const {
		control,
		reset: resetForm,
		handleSubmit,
		formState: { isValid }
	} = useForm<CreateArtistEventBodyDto>();

	const onSubmit = async (data: CreateArtistEventBodyDto) => {
		try {
			setButtonState('loading');
			const response = await createArtistEventMutation({
				params: {
					artist_uid: artistData.artist_uid
				},
				body: data
			}).unwrap();

			close();
			setTimeout(() => {
				manageEventPage(response.event.event_uid);
			}, 500);
		} catch {
			setButtonState('active');
			toastError();
		}
	};

	useEffect(() => {
		setButtonState(isValid ? 'active' : 'disabled');
	}, [isValid]);

	const close = () => {
		sheetApi.close();
	};

	const resetAll = () => {
		resetButtonState();
		resetForm();
	};

	return {
		close,
		resetAll,
		onSubmit: handleSubmit(onSubmit),
		control,
		buttonState
	};
};

export default useCreateArtistEventBottomSheet;
