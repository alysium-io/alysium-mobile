import React from 'react'
import { HeaderSafeArea, ScrollView, Separator, Text, View } from '@atomic'
import { BasePage } from '@organisms'
import {
    PartiesInvolvedSection,
    SelectEventSection,
    SlotDetailsSection,
    SummarySection
} from './components'


const EditContractPage = () => {

    return (
        <BasePage>
            <HeaderSafeArea>
                <ScrollView alwaysBounceVertical>
                    <View margin='m'>
                        <Text variant='page-header'>Edit Contract</Text>
                    </View>
                    <PartiesInvolvedSection />
                    <Separator size='large' />
                    <SelectEventSection />
                    <Separator size='large' marginVertical='l' />
                    <SlotDetailsSection />
                    <Separator marginVertical='l' />
                    <SummarySection />
                </ScrollView>
            </HeaderSafeArea>
        </BasePage>
    )
}

export default EditContractPage