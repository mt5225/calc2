
import { combineReducers } from 'redux'
import calcReducer from './calcReducer'
import validateReducer from './validateReducer'
import stepReducer from './stepReducer'
import uiReducer from './uiReducer'
import { routerReducer as routing } from 'react-router-redux'

const calcApp = combineReducers({
    calcReducer,
    validateReducer,
    stepReducer,
    uiReducer,
    routing,
})

export default calcApp