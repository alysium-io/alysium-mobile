import {
	BottomSheetBackdrop as RNBottomSheetBackdrop,
	BottomSheetBackdropProps as RNBottomSheetBackdropProps
} from '@gorhom/bottom-sheet';
import React from 'react';

const BottomSheetBackdrop: React.FC<RNBottomSheetBackdropProps> = (props) => {
	return (
		<RNBottomSheetBackdrop
			{...props}
			enableTouchThrough={true}
			disappearsOnIndex={-1}
		/>
	);
};

export default BottomSheetBackdrop;
