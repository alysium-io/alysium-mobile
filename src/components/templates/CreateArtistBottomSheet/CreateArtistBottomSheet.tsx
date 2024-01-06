import React from 'react'
import { DismissKeyboardWrapper, View } from '@atomic'
import { BottomSheetFooter, FullScreenBottomSheet } from '@organisms'
import { BottomSheetFooterProps } from '@gorhom/bottom-sheet'
import { SheetApi } from '@hooks'
import { Button, DeclarativeText, EditableProfileImage, LargeTextInput } from '@molecules'
import { global } from '@etc'
import useCreateArtist from './useCreateArtist'


interface CreateArtistBottomSheetProps {
    sheetApi: SheetApi
}

const CreateArtistBottomSheet : React.FC<CreateArtistBottomSheetProps> = ({
    sheetApi
}) => {

    const { setNewArtistName, submitNewArtist } = useCreateArtist()

    const _submitNewArtist = () => {
        submitNewArtist()
        sheetApi.close()
    }

    const CustomFooter : React.FC<BottomSheetFooterProps> = (props) => {
        return (
            <BottomSheetFooter {...props}>
                <View marginHorizontal='l'>
                    <Button
                        text='Dismiss'
                        onPress={sheetApi.close}
                        variant='outlined'
                        containerProps={{ marginBottom: 's' }}
                    />
                    <Button
                        text='Create Artist'
                        onPress={_submitNewArtist}
                        color_variant='matt'
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
                        placeholder='Artist Name'
                        onChangeText={setNewArtistName}
                    />
                    <View margin='m' width='100%'>
                        <DeclarativeText
                            textItems={[
                                {
                                    text: 'Give your ',
                                    variant: 'paragraph-small'
                                },
                                {
                                    text: 'new artist',
                                    variant: 'paragraph-small-bold'
                                },
                                {
                                    text: ' a cOoL name!',
                                    variant: 'paragraph-small'
                                },
                                {
                                    text: '(e.g. "Ahzira")',
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

export default CreateArtistBottomSheet