const initialState = {
    stayDaysMessage: '',
}

const validateReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'V_DAYS':
            if (/^\d+$/.test(action.payload.value)) {         
            return Object.assign(
                {},
                state,
                { stayDaysMessage: ''}
            )
            } else {
            return Object.assign(
                {},
                state,
                { stayDaysMessage: '请填入数字'}
            )
            }
        default:
            return state
    }
}

export default validateReducer