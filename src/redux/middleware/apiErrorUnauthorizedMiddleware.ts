import { Middleware } from '@reduxjs/toolkit'


const apiErrorUnauthorizedMiddleware : Middleware = ({ dispatch }) => (next) => (action) => {

	/**
	 * This middlware should log the user out if the api returns a 401 error
	 */

	// Get any rejected action
	const isRejectedAction = action.type.endsWith('/rejected')

	if (isRejectedAction) {
		const errorStatus = action?.payload?.status
		if (errorStatus === 400) {
			console.log('Should log user out')
		}
	}

	return next(action)
    
}

export default apiErrorUnauthorizedMiddleware