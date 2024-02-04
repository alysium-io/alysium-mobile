import React from 'react'
import { TextInput, View } from '@atomic'
import { StyleSheet } from 'react-native'
import { TextInputApi } from '@hooks'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'


interface EditableDescriptionProps extends React.ComponentProps<typeof TextInput> {
    textInputApi: TextInputApi
}

const EditableDescription : React.FC<EditableDescriptionProps> = ({
    textInputApi,
    ...props
}) => {

    return (
        <TouchableWithoutFeedback onPress={() => { console.log('here'); textInputApi.focus() }}>
            <View style={styles.container} borderColor='t3' padding='m'>
                <TextInput
                    ref={textInputApi.ref}
                    onChangeText={textInputApi.setText}
                    {...props}
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        borderLeftWidth: 2,
        borderRightWidth: 2
    }
})

export default EditableDescription