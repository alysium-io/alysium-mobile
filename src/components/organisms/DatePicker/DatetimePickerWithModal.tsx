import React, { useEffect, useState } from 'react'
import { View, DatetimePicker } from '@atomic'
import { Button } from '@molecules'
import { BottomSheet, BottomSheetHeader } from '@organisms'
import { useSheet } from '@hooks'


interface DatetimePickerWithModalProps {
    title?: string
    isOpen: boolean
    onConfirm?: (date: Date) => void
    onCancelled?: () => void
    onChange?: (date: Date) => void
    toggleModal: () => void
}

const DatetimePickerWithModal : React.FC<DatetimePickerWithModalProps> = ({
    title = 'Select date & time',
    isOpen,
    onConfirm,
    onCancelled,
    onChange,
    toggleModal
}) => {

    useEffect(() => {
        if (isOpen) {
            open()
        } else {
            close()
        }
    }, [isOpen])

    const {
        sheetRef,
        open,
        close
    } = useSheet()

    const [date, setDate] = useState(new Date())

    const _onChange = (date: Date) => {
        setDate(date)
        onChange && onChange(date)
    }

    const _onConfirm = () => {
        onConfirm && onConfirm(date)
        close()
    }

    const _onCancelled = () => {
        onCancelled && onCancelled()
        close()
    }

    const onDismiss = () => {
        toggleModal()
    }

    return (
        <BottomSheet sheetRef={sheetRef} onDismiss={onDismiss}>
            <BottomSheetHeader text={title} />
            <DatetimePicker
                date={date}
                onDateChange={_onChange}
            />
            <View margin='m' flexDirection='row'>
                <View flex={1} marginRight='s'>
                    <Button onPress={_onCancelled} text='cancel' variant='outlined' />
                </View>
                <View flex={1} marginLeft='s'>
                    <Button onPress={_onConfirm} text='confirm' />
                </View>
            </View>
        </BottomSheet>
    )
}

export default DatetimePickerWithModal