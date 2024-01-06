import React from 'react'
import { HeaderSafeArea, View, Text } from '@atomic'
import { Button } from '@molecules'
import { BasePage } from '@organisms'
import { useNavigation } from '@hooks'
import { ScrollView, StyleSheet } from 'react-native'


const ExperimentPageOne = () => {

    const { experimentPageTwo } = useNavigation()

    return (
        <BasePage>
            <HeaderSafeArea>
                <ScrollView>
                    <View margin='m'>
                        <Text variant='page-header'>Experiment Page 1</Text>
                    </View>
                    <View margin='m'>
                        <Button
                            text='Go to Experiment Page 2'
                            onPress={experimentPageTwo}
                        />
                    </View>
                    <View margin='m'>
                        <Button
                            text='Test Button'
                            onPress={() => console.log('test')}
                        />
                    </View>
                </ScrollView>
            </HeaderSafeArea>
        </BasePage>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})

export default ExperimentPageOne