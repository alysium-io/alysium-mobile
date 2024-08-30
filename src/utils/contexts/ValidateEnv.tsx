import { Text, View } from '@atomic';
import { createUseContextHook } from '@hooks';
import { ProviderProps } from '@types';
import React, { createContext } from 'react';
import Config from 'react-native-config';
import { Env, validateEnv } from 'src/etc/env';

export type ValidateEnvContextType = {
	env: Env;
	errors: string[] | null;
};

export const ValidateEnvContext = createContext({} as ValidateEnvContextType);

export const ValidateEnvProvider: React.FC<ProviderProps> = ({ children }) => {
	const { env, errors } = validateEnv();

	if (env === null) {
		return (
			<View
				flex={1}
				justifyContent='center'
				alignItems='center'
				backgroundColor='bg.p'
			>
				<Text variant='paragraph-large-medium' marginBottom='m'>
					Error reading environment:
				</Text>
				{Object.entries(Config).map(([key, value]) => (
					<Text key={key} marginBottom='s'>
						{key}: {value?.toString()}
					</Text>
				))}
				<Text marginTop='m'>
					{errors ? errors.toString() : 'No logable errors'}
				</Text>
			</View>
		);
	}

	return (
		<ValidateEnvContext.Provider
			value={{
				env,
				errors
			}}
		>
			{children}
		</ValidateEnvContext.Provider>
	);
};

export const useValidateEnvContext =
	createUseContextHook<ValidateEnvContextType>(
		ValidateEnvContext,
		'EnvContext'
	);
