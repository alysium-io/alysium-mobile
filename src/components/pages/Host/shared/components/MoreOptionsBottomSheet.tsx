import React from 'react'
import { SheetRef } from '@hooks'
import {
    BottomSheet,
    BottomSheetListItem
} from '@organisms'


interface MoreOptionsBottomSheetProps {
    sheetRef: SheetRef
}

const MoreOptionsBottomSheet : React.FC<MoreOptionsBottomSheetProps> = ({
    sheetRef
}) => {

    return (
        <BottomSheet sheetRef={sheetRef}>
            <BottomSheetListItem
                text='send message'
                icon='dm'
                onPress={() => console.log('dm')}
            />
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
        </BottomSheet>
    )
}

export default MoreOptionsBottomSheet