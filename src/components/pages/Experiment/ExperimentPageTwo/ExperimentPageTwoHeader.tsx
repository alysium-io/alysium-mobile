import React from 'react'
import { View } from '@atomic'
import { Header, HeaderIconButton, HeaderTitle } from '@organisms'
import { StackHeaderProps } from '@react-navigation/stack'


const ExperimentPageTwoHeader : React.FC<StackHeaderProps> = (stackHeaderProps) => {

    return (
        <Header
            stackHeaderProps={stackHeaderProps}
            LeftComponent={() => <HeaderIconButton onPress={() => console.log('back')} icon='arrow-left' />}
            CenterComponent={() => <HeaderTitle title='experiment page 2' />}
            RightComponent={
                () => (
                    <>
                        <HeaderIconButton onPress={() => console.log('bell')} icon='bell' />
                        <View marginLeft='m'>
                            <HeaderIconButton onPress={() => console.log('menu')} icon='menu' />
                        </View>
                    </>
                )
            }
        />
    )
}

export default ExperimentPageTwoHeader