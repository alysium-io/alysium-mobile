import React from 'react'
import { View } from '@atomic'
import { Header, HeaderIconButton, HeaderTitle } from '@organisms'
import { StackHeaderProps } from '@react-navigation/stack'
import { useBetaConfig } from '@templates'


const PagesPageHeader : React.FC<StackHeaderProps> = (stackHeaderProps) => {

    const { betaConfigSheetApi } = useBetaConfig()

    return (
        <Header
            stackHeaderProps={stackHeaderProps}
            CenterComponent={() => <HeaderTitle title='page examples' />}
            RightComponent={
                () => (
                    <>
                        <View marginLeft='m'>
                            <HeaderIconButton onPress={betaConfigSheetApi.open} icon='menu' />
                        </View>
                    </>
                )
            }
        />
    )
}

export default PagesPageHeader