const initialState = {
    stayDaysMessage: '',
    showStepWarning: false,
    warningMessage: ''
}

const validateReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'V_DAYS':
            if (/^\d+$/.test(action.payload.value)) {
                return Object.assign(
                    {},
                    state,
                    { stayDaysMessage: '' }
                )
            } else {
                return Object.assign(
                    {},
                    state,
                    { stayDaysMessage: '请填入数字' }
                )
            }
        case 'V_INVALID_NEXT':
            return Object.assign(
                {},
                state,
                {
                    showStepWarning: true,
                    warningMessage: action.payload.message
                }
            )
        case 'A_SNACKBAR_CLOSE':
            return Object.assign(
                {},
                state,
                {
                    showStepWarning: false,
                    warningMessage: ''
                }
            )
        default:
            return state
    }
}

export default validateReducer