import React from 'react'
import { SheetRef } from '@hooks'
import {
    BottomSheet,
    BottomSheetHeader,
    BottomSheetListItemWithToggle
} from '@organisms'


interface NotificationsOptionsBottomSheetProps {
    sheetRef: SheetRef
}

const NotificationsOptionsBottomSheet : React.FC<NotificationsOptionsBottomSheetProps> = ({
    sheetRef
}) => {

    return (
        <BottomSheet sheetRef={sheetRef}>
            <BottomSheetHeader text='Notifications Settings' />
            <BottomSheetListItemWithToggle
                text='Event Created'
                onToggle={() => console.log('event created')}
            />
            <BottomSheetListItemWithToggle
                text='Booked Near Me'
                onToggle={() => console.log('booked near me')}
                border={false}
            />
        </BottomSheet>
    )
}

export default NotificationsOptionsBottomSheet