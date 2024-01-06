import React from 'react'
import {
    BottomSheetBackdrop as RNBottomSheetBackdrop,
    BottomSheetBackdropProps as RNBottomSheetBackdropProps
} from '@gorhom/bottom-sheet'


const BottomSheetBackdrop : React.FC<RNBottomSheetBackdropProps> = (props) => {
    return <RNBottomSheetBackdrop {...props} enableTouchThrough={true} disappearsOnIndex={-1} />
}

export default BottomSheetBackdrop