import 'react-native'
import React from 'react'
import Test from '../src/components/test/Test'

import renderer from 'react-test-renderer'

it('renders correctly', () => {
    renderer.create(<Test />)
})
