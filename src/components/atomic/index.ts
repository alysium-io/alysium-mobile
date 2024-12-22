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
export { default as Checkbox } from './Checkbox';
export { default as GestureHandlerRootView } from './GestureHandlerRootView';
export { default as Image } from './Image';
export { default as KeyboardAvoidingView } from './KeyboardAvoidingView';
export { default as PersonaView } from './PersonaView';
export { default as Radio } from './Radio';
export { default as ScrollView } from './ScrollView';
export { default as Switch } from './Switch';
export { default as Text } from './Text';
export { default as TextInput } from './TextInput';
export { default as View } from './View';
export { default as ViewRef } from './ViewRef';

/**
 * Dependency Overrides
 */
export { default as BlurView } from './BlurView';
export { default as DateTimePicker } from './DateTimePicker';
export { default as LinearGradient } from './LinearGradient';
export { default as Path } from './Path';
export { default as SkeletonPlaceholder } from './SkeletonPlaceholder';
export { default as Svg } from './Svg';
export { default as Toast } from './Toast';

/**
 * Custom Components
 */
export { default as ActivityIndicator } from './ActivityIndicator';
export { default as AppTransitionWrapper } from './AppTransitionWrapper';
export { default as Avatar } from './Avatar';
export { default as BgTouchAnimation } from './BgTouchAnimation';
export { default as ComplexImage } from './ComplexImage';
export * from './DeclarativeText';
export { default as DefaultImage } from './DefaultImage';
export { default as DismissKeyboardWrapper } from './DismissKeyboardWrapper';
export { default as DisplayEnvironment } from './DisplayEnvironment';
export { default as DynamicGrid } from './DynamicGrid';
export { default as Hyperlink } from './Hyperlink';
export { default as Icon } from './Icon';
export { default as KeyboardAvoidingFooter } from './KeyboardAvoidingFooter';
export { default as KeyboardViewFill } from './KeyboardViewFill';
export { default as LiveIndicator } from './LiveIndicator';
export { default as Loading } from './Loading';
export { default as NotchMargin } from './NotchMargin';
export { default as NotchSafeArea } from './NotchSafeArea';
export { default as Or } from './Or';
export { default as Overlay } from './Overlay';
export {
	default as PhoneNumberTextInput,
	type PhoneNumberTextInputProps
} from './PhoneNumberTextInput';
export { default as QRCode } from './QRCode';
export { default as Section } from './Section';
export { default as SlideInOutView } from './SlideInOutView';
export { default as StatusBar } from './StatusBar';
export { default as TagAvatar } from './TagAvatar';
export { default as Touchable } from './Touchable';
