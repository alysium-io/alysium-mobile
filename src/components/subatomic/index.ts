/**
 *
 * @module subatomic
 *
 * @description
 * The purpose of this module is to wire up react native with any dependencies that we
 * use in this project at the lowest level (we aren't even creating actual components yet).
 * For example, we use react-native-reanimated and @shopify/restyle throughout the project,
 * and each time you create a component with those modules, there's a bit of boilerplate/overhead.
 * This module is meant to abstract that away so that we can just import the components we need
 * from this module and not have to worry about the boilerplate from our dependencies.
 *
 */

export * from './Image';
export * from './Text';
export * from './TextInput';
export * from './View';
