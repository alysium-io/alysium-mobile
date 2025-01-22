import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';

export interface BottomSheetControlApi {
	controlProps: {
		ref: React.RefObject<BottomSheetModal>;
		onChange: (index: number) => void;
	};
	currentIndex: number;
	snap: (index: number) => void;
	close: () => void;
}

const useBottomSheetControl = (): BottomSheetControlApi => {
	/**
	 * This hook just helps give us slightly better control
	 * over the bottom sheet because there are certain scenarios
	 * where it gets finnicky, such as when we open it with multiple
	 * different snap points on the home page map to display event
	 * information.
	 */
	const ref = useRef<BottomSheetModal>(null);
	const [currentIndex, onChange] = useState(-1);

	const snap = (index: number) => {
		if (currentIndex === -1) {
			// We first have to present it, then we can snap to it.
			// If you do not do this, snapToIndex will not work.
			ref.current?.present();

			setTimeout(() => {
				ref.current?.snapToIndex(index);
			}, 100);
		} else if (currentIndex !== index) {
			ref.current?.snapToIndex(index);
		}
	};

	const close = () => {
		ref.current?.close();
	};

	return {
		controlProps: {
			onChange,
			ref
		},
		currentIndex,
		snap,
		close
	};
};

export default useBottomSheetControl;
