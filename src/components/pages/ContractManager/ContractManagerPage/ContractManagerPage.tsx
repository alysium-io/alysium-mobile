import React from 'react'
import { HeaderSafeArea, ScrollView, Text, View } from '@atomic'
import { BasePage } from '@organisms'
import { ContractsListSection } from './components'


const ContractManagerPage = () => {

    return (
        <BasePage>
            <HeaderSafeArea>
                <ScrollView alwaysBounceVertical>
                    <View margin='m'>
                        <Text variant='page-header'>Contract Manager</Text>
                    </View>
                    <ContractsListSection />
                </ScrollView>
            </HeaderSafeArea>
        </BasePage>
    )
}

export default ContractManagerPage