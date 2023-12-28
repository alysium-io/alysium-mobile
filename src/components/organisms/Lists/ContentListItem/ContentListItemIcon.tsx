import React from 'react'
import { View, Icon } from '@atomic'
import { TouchableWithoutFeedback } from 'react-native'


const ArrowIcon : React.FC = () => (
    <Icon name='arrow-right' color='ion' size='small' />
)

const MenuIcon : React.FC<{ onPress?: () => void }> = ({ onPress }) => (
    <TouchableWithoutFeedback onPress={onPress}>
        <View style={{
            height: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            width: 20
        }} marginHorizontal='s'>
            <Icon name='meatballs' color='t2' />        
        </View>
    </TouchableWithoutFeedback>
)

interface ContentListItemIconProps {
    type: 'arrow' | 'menu'
    onPress?: () => void
}

const ContentListItemIcon : React.FC<ContentListItemIconProps> = ({
    type,
    onPress
}) => {

    if (type === 'arrow') {
        return <ArrowIcon />
    }

    if (type === 'menu') {
        return <MenuIcon onPress={onPress} />
    }
}

export default ContentListItemIcon