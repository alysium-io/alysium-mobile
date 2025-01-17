import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';

interface IBottomSheetControl {
	controlProps: {
		ref: React.RefObject<BottomSheetModal>;
		onChange: (index: number) => void;
	};
	currentIndex: number;
	snap: (index: number) => void;
	close: () => void;
}

const useBottomSheetControl = (): IBottomSheetControl => {
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
