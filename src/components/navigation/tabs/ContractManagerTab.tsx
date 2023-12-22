import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ContractManagerStackNavigatorParamList } from '@types'
import { useTabSettings } from '../hooks'
import {
    ContractManagerPage,
    ContractManagerPageHeader,
    EditContractPage,
    EditContractPageHeader
} from '@pages'


export const ContractManagerStack = createStackNavigator<ContractManagerStackNavigatorParamList>()

const ContractManagerTab = () => {

    const { screenOptions } = useTabSettings()

    return (
        <ContractManagerStack.Navigator screenOptions={screenOptions}>

            <ContractManagerStack.Screen
                name='ContractManagerPage'
                component={ContractManagerPage}
                options={{ header: ContractManagerPageHeader }}
            />
            
            <ContractManagerStack.Screen
                name='EditContractPage'
                component={EditContractPage}
                options={{ header: EditContractPageHeader }}
            />

        </ContractManagerStack.Navigator>
    )
}

export default ContractManagerTab