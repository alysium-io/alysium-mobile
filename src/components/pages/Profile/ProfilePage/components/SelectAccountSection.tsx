import React from 'react'
import { Section, View } from '@atomic'
import { SectionHeader } from '@molecules'
import { ContentListItem } from '@organisms'
import { ContentType } from '@types'
import { global } from '@etc'
import { useUser } from '@hooks'


const SelectAccountSection = () => {

    const { user } = useUser()

    return (
        <Section marginBottom='xl'>
            <View marginHorizontal='m'>
                <SectionHeader text='Select Account' variant='large' />
            </View>
            <ContentListItem
                title={user.user?.username || 'username'}
                subtitle='user'
                onPress={() => console.log('Pressed')}
                contentType={ContentType.user}
                image={global.artistImages['seth hills']}
                border
            />
        </Section>
    )
}

export default SelectAccountSection