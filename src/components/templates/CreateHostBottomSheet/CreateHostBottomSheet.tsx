import React from 'react'
import { DismissKeyboardWrapper, View } from '@atomic'
import { BottomSheetFooter, FullScreenBottomSheet } from '@organisms'
import { BottomSheetFooterProps } from '@gorhom/bottom-sheet'
import { SheetApi } from '@hooks'
import { Button, DeclarativeText, EditableProfileImage, LargeTextInput } from '@molecules'
import { global } from '@etc'
import useCreateHost from './useCreateHost'


interface CreateHostBottomSheetProps {
    sheetApi: SheetApi
}

const CreateHostBottomSheet : React.FC<CreateHostBottomSheetProps> = ({
    sheetApi
}) => {

    const { setNewHostName, submitNewHost } = useCreateHost()

    const _submitNewHost = () => {
        submitNewHost()
        sheetApi.close()
    }

    const CustomFooter : React.FC<BottomSheetFooterProps> = (props) => {
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
                        text='Create Host'
                        onPress={_submitNewHost}
                        colorVariant='positive'
                    />
                </View>
            </BottomSheetFooter>
        )
    }

    return (
        <FullScreenBottomSheet sheetApi={sheetApi} footerComponent={CustomFooter}>
            <DismissKeyboardWrapper>
                <View margin='m' justifyContent='center' alignItems='center'>
                    <View marginVertical='m'>
                        <EditableProfileImage image={global.sampleData.images.artist} />
                    </View>
                    <LargeTextInput
                        placeholder='Host Name'
                        onChangeText={setNewHostName}
                    />
                    <View margin='m' width='100%'>
                        <DeclarativeText
                            textItems={[
                                {
                                    text: 'Give your ',
                                    variant: 'paragraph-small'
                                },
                                {
                                    text: 'new host',
                                    variant: 'paragraph-small-bold'
                                },
                                {
                                    text: ' a cOoL name!',
                                    variant: 'paragraph-small'
                                },
                                {
                                    text: '(e.g. "SubSessions")',
                                    variant: 'paragraph-small-bold',
                                    color: 'matt_light',
                                    newline: true
                                }
                            ]}
                        />
                    </View>
                </View>
            </DismissKeyboardWrapper>
        </FullScreenBottomSheet>
    )
}

export default CreateHostBottomSheet