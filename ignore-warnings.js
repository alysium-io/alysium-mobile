import { LogBox } from 'react-native';

LogBox.ignoreLogs([
	/Battery state `unknown` and monitoring disabled, this is normal for simulators and tvOS./,
	/Tried to modify key `reduceMotion` of an object which has been already passed to a worklet./
]);
