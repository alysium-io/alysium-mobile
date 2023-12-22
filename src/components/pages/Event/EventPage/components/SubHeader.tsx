import React from 'react'
import { Section, View, Text } from '@atomic'


const SubHeader = () => {

    return (
        <Section margin='m' flexDirection='row' alignItems='center' justifyContent='space-between'>
            <View>
                <Text
                    variant='paragraph-large-medium'
                    style={{ marginBottom: 6 }}
                >Thurs. Oct 28th</Text>
                <Text
                    variant='paragraph-medium'
                    color='t2'
                >10:00pm</Text>
            </View>
            <View>
                <Text
                    variant='paragraph-medium'
                    style={{ marginBottom: 6 }}
                    textAlign='right'
                >Amsterdam, NE</Text>
                <Text variant='paragraph-medium' textAlign='right'
                >10083 N. Condor Street</Text>
            </View>
        </Section>
    )
}

export default SubHeader