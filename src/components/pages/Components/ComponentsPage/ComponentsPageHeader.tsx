import React from 'react'
import { View } from '@atomic'
import { StackHeaderProps } from '@react-navigation/stack'
import { useBetaConfig } from '@templates'
import {
    Header,
    HeaderIconButton,
    HeaderTitle
} from '@organisms'


const ComponentsPageHeader : React.FC<StackHeaderProps> = (stackHeaderProps) => {

    const { betaConfigSheetApi } = useBetaConfig()

    return (
        <Header
            stackHeaderProps={stackHeaderProps}
            CenterComponent={() => <HeaderTitle title='components' />}
            RightComponent={
                () => (
                    <>
                        <HeaderIconButton onPress={() => console.log('bell')} icon='components' />
                        <View marginLeft='m'>
                            <HeaderIconButton onPress={betaConfigSheetApi.open} icon='menu' />
                        </View>
                    </>
                )
            }
        />
    )
}

export default ComponentsPageHeader