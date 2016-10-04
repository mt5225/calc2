
import { combineReducers } from 'redux'
import calcReducer from './calcReducer'
import validateReducer from './validateReducer'
import stepReducer from './stepReducer'

const calcApp = combineReducers({
    calcReducer,
    validateReducer,
    stepReducer,
})

export default calcApp