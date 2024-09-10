import Config from 'react-native-config';
import * as yup from 'yup';
import { getHostIp } from './network';

const envNames = ['dev', 'qa', 'demo', 'prod'] as const;

export const envSchema = yup.object().shape({
	imagesBaseUrl: yup.string().required('IMAGES_BASE_URL is required'),
	apiUrl: yup.string().required('API_URL is required'),
	env: yup
		.string()
		.oneOf(envNames, 'ENV must be one of the following: ' + envNames.join(', '))
		.required()
});

export type Env = yup.InferType<typeof envSchema>;

export const validateEnv = (): { env: Env | null; errors: any | null } => {
	try {
		const validatedEnv = envSchema.validateSync(
			{
				imagesBaseUrl: Config.IMAGES_BASE_URL,
				apiUrl:
					Config.ENV === 'dev' ? `http://${getHostIp()}:3000` : Config.API_URL,
				env: Config.ENV
			},
			{ abortEarly: false }
		);

		return {
			env: validatedEnv,
			errors: null
		};
	} catch (error: any) {
		console.error('Environment variable validation failed:', error);
		console.log('Config:', Config);
		return {
			env: null,
			errors: error
		};
	}
};

const env = validateEnv();
export default env;
