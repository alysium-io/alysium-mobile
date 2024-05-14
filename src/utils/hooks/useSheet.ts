import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef } from 'react';

export type SheetRef = React.MutableRefObject<BottomSheetModal | null>;

export type SheetApi = {
	sheetRef: SheetRef;
	open: () => void;
	close: () => void;
};

const useSheet = (): SheetApi => {
	const sheetRef = useRef<BottomSheetModal | null>(null);

	const open = () => {
		sheetRef.current?.present();
	};

	const close = () => {
		sheetRef.current?.dismiss();
	};

	return {
		sheetRef,
		open,
		close
	};
};

export default useSheet;
