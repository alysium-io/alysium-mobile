import React, { useCallback } from 'react'
import { DismissKeyboardWrapper, View } from '@atomic'
import { BottomSheetFooter, FullScreenBottomSheet } from '@organisms'
import { SheetApi, useTextInput } from '@hooks'
import { Button, EditableTextInputWithLabel } from '@molecules'


interface CreateLinkBottomSheetProps {
    sheetApi: SheetApi
}

const CreateLinkBottomSheet : React.FC<CreateLinkBottomSheetProps> = ({
    sheetApi
}) => {

    const nameTextInputApi = useTextInput()
    const urlTextInputApi = useTextInput()

    const submitNewLink = () => {
        console.log({
            name: nameTextInputApi.text.current,
            url: urlTextInputApi.text.current
        })
    }

    const CustomFooter = useCallback((props: React.ComponentProps<typeof BottomSheetFooter>) => {
        return (
            <BottomSheetFooter {...props}>
                <View marginHorizontal='l'>
                    <View marginBottom='s'>
                        <Button
                            text='Dismiss'
                            onPress={sheetApi.close}
                            variant='outlined'
                        />
                    </View>
                    <Button
                        text='Create Link'
                        onPress={submitNewLink}
                        colorVariant='warning'
                    />
                </View>
            </BottomSheetFooter>
        )
    }, [])

    const onClose = () => {
        nameTextInputApi.reset()
        nameTextInputApi.reset()
    }

    return (
        <FullScreenBottomSheet sheetApi={sheetApi} footerComponent={CustomFooter} onDismiss={onClose}>
            <DismissKeyboardWrapper>
                <View margin='m'>
                    <EditableTextInputWithLabel
                        label='name'
                        placeholder='name'
                        textInputApi={nameTextInputApi}
                        onChangeText={nameTextInputApi.setText}
                    />
                    <EditableTextInputWithLabel
                        label='url'
                        placeholder='www.example.com'
                        textInputApi={urlTextInputApi}
                        onChangeText={urlTextInputApi.setText}
                    />
                </View>
            </DismissKeyboardWrapper>
        </FullScreenBottomSheet>
    )
}

export default CreateLinkBottomSheet