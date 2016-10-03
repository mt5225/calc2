
import { combineReducers } from 'redux'
import calcReducer from './calcReducer'
import validateReducer from './validateReducer'

const calcApp = combineReducers({
    calcReducer,
    validateReducer,
})

export default calcApp