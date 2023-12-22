import React from 'react'
import { Section, View } from '@atomic'
import { SectionHeader } from '@molecules'
import { MenuListItem, RadioListItem, EditableTextSection } from '@organisms'


const SlotDetailsSection = () => {

    return (
        <Section marginVertical='m'>
            <View margin='m'>
                <SectionHeader text='Slot Details' variant='large' />
            </View>
            <MenuListItem
                title='Start Time'
                onPress={() => console.log('Start Time')}
                secondaryText='10:00 PM'
            />
            <MenuListItem
                title='End Time'
                onPress={() => console.log('End Time')}
                secondaryText='11:00 PM'
            />
            <MenuListItem
                title='Guarantee Amount'
                onPress={() => console.log('Guarantee Amount')}
                secondaryText='$2,500'
            />
            <View marginHorizontal='m'>
                <RadioListItem
                    checked={true}
                    onPress={() => console.log('Radio')}
                    title='Equipment provided?'
                    subtitle={[
                        {
                            text: 'Add an ',
                            variant: 'paragraph-small'
                        },
                        {
                            text: 'Equipment List',
                            variant: 'paragraph-small',
                            color: 'matt',
                            underline: true
                        }
                    ]}
                />
            </View>
            <View margin='m'>
                <EditableTextSection
                    header='Additional Notes'
                    placeholder='Type here...'
                    onChangeText={text => console.log(text)}
                />
            </View>
        </Section>
    )
}

export default SlotDetailsSection