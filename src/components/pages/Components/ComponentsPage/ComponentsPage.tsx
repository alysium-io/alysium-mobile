import React, { useState } from 'react'
import { useSearch, useSheet, useTheme } from '@hooks'
import { IconNames, SvgIcons } from '@svg'
import { ContentType } from '@types'
import { global } from '@etc'
import day from 'dayjs'
import { SimpleGrid } from 'react-native-super-grid'
import {
    View,
    Text,
    DatetimePicker,
    Section,
    HeaderSafeArea,
    ScrollView,
    Icon
} from '@atomic'
import {
    Button,
    DeclarativeText,
    LargeTextInput,
    SectionHeader,
    ToggleButton,
    EditableProfileImage
} from '@molecules'
import {
    CategoricalListItemForContentType,
    SearchBar,
    ContentListItem,
    RadioListItem,
    MenuListItem,
    BlockListItem,
    LargeSelectableItemList,
    LargeSelectableItemRadioList,
    Lineup,
    DatetimePickerWithModal,
    BottomSheet,
    FullScreenDismissableBottomSheet,
    BasePage,
    ContentListItemToggler
} from '@organisms'


const ComponentsPage = () => {

    const { theme } = useTheme()

    const {
        setSearchText,
        clearSearchText
    } = useSearch()

    const [sampleToggleButton, setSampleToggleButton] = useState<boolean>(true)
    const [sampleRadio, setSampleRadio] = useState<boolean>(true)
    const [isDatetimePickerOpen, isSetDatetimePickerOpen] = useState<boolean>(false)
    const fullScreenModalSheetApi = useSheet()
    const standardSheetApi = useSheet()
    const variantSheetApi = useSheet()

    return (
        <BasePage>
            <HeaderSafeArea>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View marginVertical='m'>
                        <Section margin='m'>
                            <SectionHeader text='Editable Profile Image' />
                            <EditableProfileImage
                                image={global.sampleData.images.artist}
                            />
                        </Section>
                        <Section margin='m'>
                            <SectionHeader text='Full Screen Modal' />
                            <View marginVertical='s'>
                                <Button
                                    text='Dismissable Full Screen Sheet'
                                    onPress={fullScreenModalSheetApi.open}
                                />
                            </View>
                            <View marginVertical='s'>
                                <Button
                                    text='Standard Sheet'
                                    onPress={standardSheetApi.open}
                                />
                            </View>
                            <View marginVertical='s'>
                                <Button
                                    text='Variant Sheet'
                                    onPress={variantSheetApi.open}
                                />
                            </View>
                            <FullScreenDismissableBottomSheet sheetApi={fullScreenModalSheetApi}>
                                <DeclarativeText
                                    textItems={[
                                        {
                                            text: 'In here we might include some text.',
                                            variant: 'paragraph',
                                        }  
                                    ]}
                                />
                            </FullScreenDismissableBottomSheet>
                            <BottomSheet sheetRef={standardSheetApi.sheetRef}>
                                <View margin='m'>
                                    <View marginBottom='m'>
                                        <DeclarativeText
                                            textItems={[
                                                {
                                                    text: 'There is a bunch of text ',
                                                    variant: 'paragraph-bold',
                                                    color: 't2'
                                                },
                                                {
                                                    text: 'here',
                                                    variant: 'paragraph-bold',
                                                    color: 't1'
                                                }
                                            ]}
                                        />
                                    </View>
                                    <Button
                                        text='Dismiss'
                                        onPress={standardSheetApi.close}
                                    />
                                </View>
                            </BottomSheet>
                            <BottomSheet
                                customHandle={() => null}
                                sheetRef={variantSheetApi.sheetRef}
                                borderRadius={false}
                                backgroundColor={theme.colors.ion_dark}
                                borderColor={theme.colors.ion}
                            >
                                <View margin='m'>
                                    <View marginBottom='m'>
                                        <DeclarativeText
                                            textItems={[
                                                {
                                                    text: 'There is a bunch of text ',
                                                    variant: 'paragraph-bold',
                                                    color: 't2'
                                                },
                                                {
                                                    text: 'here',
                                                    variant: 'paragraph-bold',
                                                    color: 't1'
                                                }
                                            ]}
                                        />
                                    </View>
                                    <Button
                                        text='Dismiss'
                                        onPress={variantSheetApi.close}
                                    />
                                </View>
                            </BottomSheet>
                        </Section>
                        <Section margin='m'>
                            <SectionHeader text='Datetime Picker' />
                            <DatetimePicker
                                date={day().add(1, 'hour').toDate()}
                                onDateChange={(date) => console.log(date)}
                            />
                            <Button
                                onPress={() => isSetDatetimePickerOpen(!isDatetimePickerOpen)}
                                text='Open Datetime Picker'
                            />
                            <DatetimePickerWithModal
                                isOpen={isDatetimePickerOpen}
                                toggleModal={() => isSetDatetimePickerOpen(!isDatetimePickerOpen)}
                                onConfirm={date => console.log(date)}
                                onCancelled={() => console.log('Cancelled')}
                            />
                        </Section>
                        <Section margin='m'>
                            <SectionHeader text='Large Text Input' />
                            <LargeTextInput
                                placeholder='Type something...'
                                onChangeText={(text) => console.log(text)}
                                textAlign='center'
                            />
                            <LargeTextInput
                                placeholder='Type something else...'
                                onChangeText={(text) => console.log(text)}
                            />
                        </Section>
                        <Section marginVertical='m'>
                            <View marginHorizontal='m'>
                                <SectionHeader text='Lineup' variant='large' />
                            </View>
                            <Lineup lineup={global.sampleData.event.lineup} />
                        </Section>
                        <Section margin='m'>
                            <SectionHeader text='Large Selectable Radio' variant='large' />
                            <LargeSelectableItemRadioList
                                data={[
                                    { id: 1, title: 'Artists', icon: 'artist' },
                                    { id: 2, title: 'Hosts', icon: 'host' },
                                    { id: 3, title: 'Tags', icon: 'tag' },
                                    { id: 4, title: 'Locations', icon: 'location' }
                                ]}
                                defaultId={1}
                                onPress={(id) => console.log(id)}
                            />
                        </Section>
                        <Section margin='m'>
                            <SectionHeader text='Large Selectable Item' variant='large' />
                            <LargeSelectableItemList
                                onPress={(arr) => console.log(arr)}
                                data={[
                                    { id: 1, title: 'Artists', icon: 'artist' },
                                    { id: 2, title: 'Hosts', icon: 'host' },
                                    { id: 3, title: 'Tags', icon: 'tag' }
                                ]}
                            />
                        </Section>
                        <Section margin='m'>
                            <SectionHeader text='Secondary Header' variant='large' />
                        </Section>
                        <Section margin='m'>
                            <SectionHeader text='Declarative Text' />
                            <DeclarativeText
                                marginBottom='m'
                                textItems={[
                                    {
                                        text: 'This is a declarative text component. It has quite a bit of text because we want to demonstrate how the text wraps appropriately. ',
                                        variant: 'paragraph',
                                        color: 't1'
                                    },
                                    {
                                        text: 'Link',
                                        variant: 'paragraph-bold',
                                        color: 'matt',
                                        underline: true,
                                        onPress: () => console.log('Link pressed')
                                    },
                                    {
                                        text: ' Here we have some more text. This is a declarative text component. It has quite a bit of text because we want to demonstrate how the text wraps appropriately.',
                                        variant: 'paragraph',
                                        color: 't1'
                                    }
                                ]}
                            />
                            <DeclarativeText
                                textItems={[
                                    {
                                        text: 'You might want to ',
                                        variant: 'paragraph-small',
                                        color: 't2',
                                        underline: false
                                    },
                                    {
                                        text: 'Learn More',
                                        variant: 'paragraph-small-bold',
                                        color: 'matt',
                                        underline: true,
                                        onPress: () => console.log('Learn More pressed')
                                    },
                                    {
                                        newline: true,
                                        text: 'thanks to this text :)',
                                        variant: 'paragraph-small',
                                        color: 't2'
                                    }
                                ]}
                            />
                        </Section>
                        <Section marginHorizontal='none' marginVertical='m'>
                            <View marginHorizontal='m'>
                                <SectionHeader text='Menu List Items' icon='components' />
                            </View>
                            <MenuListItem
                                title='Settings'
                                subtitle='Account, Privacy, Notifications'
                                color='ion'
                                onPress={() => console.log('MenuListItem pressed')}
                            />
                            <MenuListItem
                                title='Account'
                                color='ion'
                                onPress={() => console.log('MenuListItem pressed')}
                            />
                            <MenuListItem
                                title='Account'
                                secondaryText='Jan 1st, 2020'
                                color='ion'
                                onPress={() => console.log('MenuListItem pressed')}
                            />
                        </Section>
                        <Section margin='m'>
                            <SectionHeader text='Block List Items' />
                            <BlockListItem
                                title='Block List Item'
                                subtitle='Subtitle'
                                icon='tag'
                                color='ion'
                            />
                            <View marginTop='m'>
                                <BlockListItem
                                    title='Iconless Item'
                                    subtitle='1.5k followers'
                                    color='haze'
                                />
                            </View>
                            <View marginTop='m'>
                                <BlockListItem
                                    title='Iconless Item'
                                    subtitle='1.5k followers'
                                    icon='artist'
                                    color='meteor'
                                />
                            </View>
                            <View marginTop='m'>
                                <BlockListItem
                                    title='Iconless Item'
                                    subtitle='1.5k followers'
                                    icon='contract'
                                    color='default'
                                />
                            </View>
                        </Section>
                        <Section margin='m'>
                            <SectionHeader text='Radio Items' />
                            <RadioListItem
                                checked={sampleRadio}
                                onPress={() => setSampleRadio(!sampleRadio)}
                                color_variant='matt'
                                title='Radio Item'
                                icon='alcohol'
                            />
                        </Section>
                        <Section margin='m'>
                            <SectionHeader text='Toggle Button' />
                            <ToggleButton
                                value={sampleToggleButton}
                                text='Toggle Button'
                                inactiveText='Something Else'
                                icon='artist'
                                inactiveIcon='arrow-right'
                                onPress={() => setSampleToggleButton(!sampleToggleButton)}
                            />
                        </Section>
                        <Section margin='m'>
                            <SectionHeader text='Buttons' />
                            <View marginBottom='m'>
                                <Button
                                    text='Save'
                                    variant='outlined'
                                    color_variant='default'
                                />
                            </View>
                            <View marginBottom='m'>
                                <Button
                                    text='Submit'
                                    variant='outlined'
                                    color_variant='ion_dark'
                                />
                            </View>
                            <View marginBottom='m'>
                                <Button
                                    text='Dismiss'
                                    variant='outlined'
                                    color_variant='meteor'
                                />
                            </View>
                            <View marginBottom='m'>
                                <Button
                                    text='Dismiss'
                                    variant='outlined'
                                    color_variant='haze'
                                />
                            </View>
                            <View marginBottom='m'>
                                <Button
                                    text='Save'
                                    variant='filled'
                                    color_variant='default'
                                />
                            </View>
                            <View marginBottom='m'>
                                <Button
                                    text='Save'
                                    variant='filled'
                                    color_variant='ion'
                                />
                            </View>
                            <View marginBottom='m'>
                                <Button
                                    text='Submit'
                                    variant='filled'
                                    color_variant='meteor'
                                />
                            </View>
                            <View marginBottom='m'>
                                <Button
                                    text='Dismiss'
                                    variant='filled'
                                    color_variant='haze'
                                />
                            </View>
                        </Section>
                        <Section marginVertical='m'>
                            <View marginHorizontal='m'>
                                <SectionHeader text='Content List Item Toggle' />
                            </View>
                            <ContentListItemToggler
                                defaultId={1}
                                onPress={(id) => console.log(id)}
                                subtitleFirst={true}
                                items={[
                                    {
                                        id: 1,
                                        image: global.sampleData.images.artist,
                                        title: 'EDX',
                                        subtitle: 'Artist'
                                    },
                                    {
                                        id: 2,
                                        image: global.sampleData.images.artist,
                                        title: 'EDX',
                                        subtitle: 'Artist'
                                    },
                                    {
                                        id: 3,
                                        image: global.sampleData.images.artist,
                                        title: 'EDX',
                                        subtitle: 'Artist'
                                    }
                                ]}
                            />
                        </Section>
                        <Section marginVertical='m'>
                            <View marginHorizontal='m'>
                                <SectionHeader text='Content List Items' />
                            </View>
                            <ContentListItem
                                title='Event'
                                subtitle='event'
                                onPress={() => console.log('event')}
                                contentType={ContentType.event}
                                image={global.sampleData.images.event}
                                borderRadius='sharp'
                                size='large'
                            />
                            <ContentListItem
                                title='Artist'
                                subtitle='artist'
                                onPress={() => console.log('artist')}
                                contentType={ContentType.artist}
                                image={global.sampleData.images.artist}
                            />
                            <ContentListItem
                                title='Host'
                                subtitle='host'
                                onPress={() => console.log('host')}
                                contentType={ContentType.host}
                                image={global.sampleData.images.host}
                                borderRadius='smooth'
                                border
                            />
                            <ContentListItem
                                title='Location'
                                subtitle='location'
                                onPress={() => console.log('location')}
                                contentType={ContentType.location}
                                image={null}
                                border
                            />
                            <ContentListItem
                                title='Tag'
                                subtitle='tag'
                                onPress={() => console.log('tag')}
                                contentType={ContentType.tag}
                                image={null}
                                size='small'
                                border
                            />
                            <ContentListItem
                                title='User'
                                subtitle='user'
                                onPress={() => console.log('user')}
                                contentType={ContentType.user}
                                image={global.sampleData.images.user}
                                size='small'
                                border
                            />
                        </Section>
                        <Section marginVertical='m'>
                            <View marginHorizontal='m'>
                                <SectionHeader text='Content List Items Defaults' />
                            </View>
                            <ContentListItem
                                title='Event'
                                subtitle='event'
                                onPress={() => console.log('event')}
                                contentType={ContentType.event}
                                image={null}
                            />
                            <ContentListItem
                                title='Artist'
                                subtitle='artist'
                                onPress={() => console.log('artist')}
                                contentType={ContentType.artist}
                                image={null}
                            />
                            <ContentListItem
                                title='Host'
                                subtitle='host'
                                onPress={() => console.log('host')}
                                contentType={ContentType.host}
                                image={null}
                            />
                            <ContentListItem
                                title='Location'
                                subtitle='location'
                                onPress={() => console.log('location')}
                                contentType={ContentType.location}
                                image={null}
                            />
                            <ContentListItem
                                title='Tag'
                                subtitle='tag'
                                onPress={() => console.log('tag')}
                                contentType={ContentType.tag}
                                image={null}
                            />
                            <ContentListItem
                                title='User'
                                subtitle='user'
                                onPress={() => console.log('user')}
                                contentType={ContentType.user}
                                image={null}
                            />
                        </Section>
                        <Section margin='m'>
                            <SectionHeader text='Search Bar' />
                            <SearchBar
                                onChangeText={setSearchText}
                                onPressClearText={clearSearchText}
                            />
                        </Section>
                        <Section marginVertical='m'>
                            <View marginHorizontal='m'>
                                <SectionHeader text='Categorical List Items' />
                            </View>
                            <CategoricalListItemForContentType
                                contentType={ContentType.artist}
                                title='Artists'
                                subtitle='24 artists following'
                                onPress={() => console.log('artists')}
                            />
                            <CategoricalListItemForContentType
                                contentType={ContentType.host}
                                title='Hosts'
                                subtitle='12 hosts following'
                                onPress={() => console.log('hosts')}
                            />
                            <CategoricalListItemForContentType
                                contentType={ContentType.tag}
                                title='Tags'
                                subtitle='2 tags following'
                                onPress={() => console.log('tags')}
                            />
                            <CategoricalListItemForContentType
                                contentType={ContentType.location}
                                title='Locations'
                                subtitle='1 location following'
                                onPress={() => console.log('locations')}
                            />
                        </Section>
                        <Section margin='m'>
                            <SectionHeader text='Icons' />
                            <SimpleGrid
                                itemDimension={100}
                                additionalRowStyle={{ marginTop: 8 }}
                                data={Object.keys(SvgIcons)}
                                renderItem={({ item }) => (
                                    <View
                                        key={item}
                                        justifyContent='center'
                                        alignItems='center'
                                    >
                                        <Icon name={item as IconNames} size='large' />
                                        <Text marginTop='s' variant='paragraph-small'>{item}</Text>
                                    </View>
                                )}
                            />
                        </Section>
                        <Section margin='m'>
                            <SectionHeader text='Text Variants' />
                            <Text variant='page-header'>Page Header</Text>
                            <Text variant='section-header-1'>Section Header 1</Text>
                            <Text variant='section-header-2'>Section Header 2</Text>
                            <Text variant='paragraph'>Paragraph</Text>
                            <Text variant='paragraph-bold'>Paragraph Bold</Text>
                            <Text variant='paragraph-small'>Paragraph Small</Text>
                            <Text variant='paragraph-small-bold'>Paragraph Small Bold</Text>
                        </Section>
                        <Section margin='m'>
                            <SectionHeader text='Colors' />
                            <Text variant='page-header' color='t1'>Text 1</Text>
                            <Text variant='page-header' color='t2'>Text 2</Text>
                            <Text variant='page-header' color='t3'>Text 3</Text>

                            <Text variant='page-header' color='ion_light'>Accent 1 light</Text>
                            <Text variant='page-header' color='ion'>Accent 1 regular</Text>
                            <Text variant='page-header' color='ion_dark'>Accent 1 dark</Text>

                            <Text variant='page-header' color='matt_light'>Accent 2 light</Text>
                            <Text variant='page-header' color='matt'>Accent 2 regular</Text>
                            <Text variant='page-header' color='matt_dark'>Accent 2 dark</Text>

                            <Text variant='page-header' color='haze_light'>Accent 3 light</Text>
                            <Text variant='page-header' color='haze'>Accent 3 regular</Text>
                            <Text variant='page-header' color='haze_dark'>Accent 3 dark</Text>

                            <Text variant='page-header' color='meteor_light'>Accent 4 light</Text>
                            <Text variant='page-header' color='meteor'>Accent 4 regular</Text>
                            <Text variant='page-header' color='meteor_dark'>Accent 4 dark</Text>
                        </Section>
                    </View>
                </ScrollView>
            </HeaderSafeArea>
        </BasePage>
    )
}

export default ComponentsPage