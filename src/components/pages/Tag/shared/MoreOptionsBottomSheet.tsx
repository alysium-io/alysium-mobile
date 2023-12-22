import React from 'react'
import { SheetRef } from '@hooks'
import {
    BottomSheet,
    BottomSheetList,
    BottomSheetListItem
} from '@organisms'


interface MoreOptionsBottomSheetProps {
    sheetRef: SheetRef;
}

const MoreOptionsBottomSheet : React.FC<MoreOptionsBottomSheetProps> = ({
    sheetRef
}) => {

    return (
        <BottomSheet sheetRef={sheetRef}>
            <BottomSheetList>
                <BottomSheetListItem
                    text='share'
                    icon='share'
                    onPress={() => console.log('share')}
                />
                <BottomSheetListItem
                    text='copy link'
                    icon='link'
                    onPress={() => console.log('copy link')}
                    border={false}
                />
            </BottomSheetList>
        </BottomSheet>
    )
}

export default MoreOptionsBottomSheet