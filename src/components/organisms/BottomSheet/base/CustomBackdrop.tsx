import React from 'react'
import {
    BottomSheetBackdrop,
    BottomSheetBackdropProps
} from '@gorhom/bottom-sheet'


const CustomBackdrop : React.FC<BottomSheetBackdropProps> = (props) => {
    return <BottomSheetBackdrop {...props} enableTouchThrough={true} disappearsOnIndex={-1} />
}

export default CustomBackdrop