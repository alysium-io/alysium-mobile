import { Env } from '@types';
import Config from 'react-native-config';
import * as yup from 'yup';

const envNames = ['dev', 'qa', 'demo', 'prod'] as const;

export const envSchema = yup.object().shape({
	apiUrl: yup.string().required('API_URL is required'),
	env: yup
		.string()
		.oneOf(envNames, 'ENV must be one of the following: ' + envNames.join(', '))
		.required()
});

export const validateEnv = (): Env => {
	try {
		const validatedEnv = envSchema.validateSync(
			{
				apiUrl: Config.API_URL,
				env: Config.ENV
			},
			{ abortEarly: false }
		);

		return validatedEnv as Env;
	} catch (error) {
		console.error('Environment variable validation failed:', error);
		console.log('Config:', Config);
		throw new Error('Invalid environment configuration');
	}
};

const env = validateEnv();
export default env;
