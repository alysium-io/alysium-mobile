import { Env } from '@types';

// export const envSchema = yup.object().shape({
// 	apiUrl: yup.string().required('API_URL is required'),
// 	env: yup
// 		.string()
// 		.oneOf(['dev', 'prod'], 'ENV must be "dev" or "prod"')
// 		.required()
// });

export const validateEnv = (): Env => {
	return {
		apiUrl: 'https://dev-api.alysium.ninja',
		env: 'dev'
	};
	// try {
	// 	const validatedEnv = envSchema.validateSync(
	// 		{
	// 			apiUrl: Config.API_URL,
	// 			env: Config.ENV
	// 		},
	// 		{ abortEarly: false }
	// 	);

	// 	return validatedEnv as Env;
	// } catch (error) {
	// 	console.error('Environment variable validation failed:', error);
	// 	console.log('Config:', Config);
	// 	// throw new Error('Invalid environment configuration');
	// 	return {
	// 		apiUrl: 'https://dev-api.alysium.ninja',
	// 		env: 'dev'
	// 	};
	// }
};

const env = validateEnv();
export default env;
