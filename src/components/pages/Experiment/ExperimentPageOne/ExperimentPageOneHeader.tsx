import React from 'react'
import { View } from '@atomic'
import { Header, HeaderIconButton, HeaderTitle } from '@organisms'
import { StackHeaderProps } from '@react-navigation/stack'
import { useBetaConfig } from '@templates'


const ExperimentPageOneHeader : React.FC<StackHeaderProps> = (stackHeaderProps) => {

    const { betaConfigSheetApi } = useBetaConfig()

    return (
        <Header
            stackHeaderProps={stackHeaderProps}
            CenterComponent={() => <HeaderTitle title='example page 1' />}
            RightComponent={
                () => (
                    <View marginLeft='m'>
                        <HeaderIconButton onPress={betaConfigSheetApi.open} icon='menu' />
                    </View>
                )
            }
        />
    )
}

export default ExperimentPageOneHeader