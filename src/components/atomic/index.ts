/**
 * 
 * @module atomic
 * 
 * @description
 * The purpose of this module is to do any component-related wiring that we need to do
 * for our dependencies so that we don't include more overhead than necessary when generating components.
 * For example, we want to be able to easily use animated or inanimate Views throughout the app, but
 * we don't want to have to worry about the boilerplate that comes with using react-native-reanimated,
 * so we create a View component that is already wired up with react-native-reanimated. However, we don't
 * want every View to be animated, we want the app to be lightweight. So we have a View component that
 * can render both animated and inanimate Views, depending on the `animated` prop.
 * 
 * This is just one example, but the bottom line is - this module is for component-related wiring
 * for our dependencies.
 * 
 * There are, however, some components that are not related to any dependencies, but are still
 * useful to have in this module. For example, the NotchMargin component is not related to any
 * dependencies, but it is useful to have in this module because it is used in many places throughout
 * the app and is a very simple component.
 * 
 */


/**
 * React Native Overrides
 */
export { default as Text } from './Text'
export { default as View } from './View'
export { default as Image } from './Image'
export { default as TextInput } from './TextInput'

/**
 * Dependency Overrides
 */
export { default as Svg } from './Svg'
export { default as Path } from './Path'
export { default as LinearGradient } from './LinearGradient'
export { default as BlurView } from './BlurView'

/**
 * Custom Components
 */
export { default as NotchMargin } from './NotchMargin'
export { default as StatusBar } from './StatusBar'
export { default as Icon } from './Icon'
export { default as BasePage } from './BasePage'
export { default as Avatar } from './Avatar'