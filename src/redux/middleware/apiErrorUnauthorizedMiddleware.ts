import { Middleware } from '@reduxjs/toolkit'
import { action_logout } from 'src/redux/user'


const apiErrorUnauthorizedMiddleware : Middleware = ({ dispatch }) => (next) => (action) => {

    /**
     * This middlware should log the user out if the api returns a 401 error
     */

    // Get any rejected action
    const isRejectedAction = action.type.endsWith('/rejected')
  
    if (isRejectedAction) {
      const errorStatus = action?.payload?.status
  
      if (errorStatus === 400) {
        dispatch(action_logout())
      }
    }

    return next(action)
    
}

export default apiErrorUnauthorizedMiddleware