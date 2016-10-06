
import { combineReducers } from 'redux'
import calcReducer from './calcReducer'
import validateReducer from './validateReducer'
import stepReducer from './stepReducer'
import uiReducer from './uiReducer'

const calcApp = combineReducers({
    calcReducer,
    validateReducer,
    stepReducer,
    uiReducer,
})

export default calcApp