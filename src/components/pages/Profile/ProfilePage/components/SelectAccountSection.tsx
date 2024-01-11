import React from 'react'
import { Section, View } from '@atomic'
import { SectionHeader } from '@molecules'
import { ContentListItem } from '@organisms'
import { usePersona, useUser } from '@hooks'


const SelectAccountSection = () => {

    const { getAccountList } = useUser()
    const { setPersona } = usePersona()

    return (
        <Section marginBottom='xl'>
            <View marginHorizontal='m'>
                <SectionHeader text='Select Account' variant='large' />
            </View>
            {
                getAccountList()?.map(account => (
                    <ContentListItem
                        key={account.id}
                        title={account.name}
                        subtitle={account.type}
                        onPress={() => setPersona(account.id, account.type)}
                        contentType={account.type}
                        image={account.image}
                        border
                        marker={account.isActive ? 'checkmark' : undefined}
                    />
                ))
            }
        </Section>
    )
}

export default SelectAccountSection