import * as UTIL from '../services/util'
import * as api from '../services/api'
import { push } from 'react-router-redux'

export const hospitalAction = (payload) => {
    return {
        type: 'Q_HOSPITAL',
        payload
    }
}

export const productionAction = (payload) => {
    return {
        type: 'Q_PRODUCTION',
        payload
    }
}

export const doctorAction = (payload) => {
    return {
        type: 'Q_DOCTOR',
        payload
    }
}

export const daysAction = (payload) => {
    return {
        type: 'Q_DAYS',
        payload
    }
}

export const houseAction = (payload) => {
    return {
        type: 'Q_HOUSE',
        payload
    }
}

export const careAction = (payload) => {
    return {
        type: 'Q_CARE',
        payload
    }
}

export const carAction = (payload) => {
    return {
        type: 'Q_CAR',
        payload
    }
}

export const cityAction = (payload) => {
    return {
        type: 'Q_CITY',
        payload
    }
}

export const nextAction = () => {
    return {
        type: 'A_NEXT',
    }
}

export const prevAction = () => {
    return {
        type: 'A_PREV',
    }
}

//will rest steps and answers in both reducers
export const resetAction = () => {
    return {
        type: 'A_RESET',
    }
}

//enable/disable next button
export const enableNextAction = () => {
    return {
        type: 'A_ENABLE_NEXT',
    }
}
export const disableNextAction = () => {
    return {
        type: 'A_DISABLE_NEXT',
    }
}

// below is validation for user inputs
export const vDaysAction = (payload) => {
    return {
        type: 'V_DAYS',
        payload
    }
}

export const vNeedInputAction = (payload) => {
    return {
        type: 'V_INVALID_NEXT',
        payload
    }
}

//verify each step
export const nextActionVerify = () => {
    return (dispatch, getState) => {
        const result = UTIL.canGoNext(getState().calcReducer, getState().stepReducer.stepIndex)
        if (result.status) {
            dispatch(nextAction())
        } else {
            dispatch(vNeedInputAction(result))
        }

    }
}

export const snackBarCloseAction = () => {
    return {
        type: 'A_SNACKBAR_CLOSE'
    }
}

export const setHospitalAction = (payload) => {
    return {
        type: 'A_HOSPITAL_ITEM_SELECT',
        payload
    }
}

export const hospitalItemSelectedAction = (payload) => {
    return (dispatch, getState) => {
        dispatch(setHospitalAction(payload))
        dispatch(push('/calc2/steps'))
    }
}

/**
 * api status
 */
export const fetchRecordRequestSent = (msg) => {
    return {
        type: 'E_REQ_SENT',
        value: msg,
    }
}

export const fetchRecordFailed = (statusText) => {
    return {
        type: 'E_REQ_FAILED',
        value: statusText,
    }
}

export const fetchRecordSuccess = (data) => {
    return {
        type: 'E_REQ_SUCCESS',
        payload: data,
    }
}

/**
 * fetch hospital records
 */
export const fetchHospitalRecordAction = () => {
    return (dispatch, getState) => {
        dispatch(fetchRecordRequestSent('fetch hospital record'))
        api.fetchHospitalRecord()
            .then(response => {
                if (response.status !== 200) {
                    dispatch(fetchRecordFailed(response.statusText))
                } else {
                    return response.json()
                        .then(result => {
                            dispatch(fetchRecordSuccess(result))
                        })
                        .catch(e => {
                            console.log(e)
                        })
                }
            }).catch(e => {
                console.log(e);
            })
    }
}
