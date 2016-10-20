const initialState = {
    step_0_hospital_desc: 'hidden',
    step_0_hospital_price: 'hidden',
    step_1_doctor_desc: 'hidden',
    step_3_city_house_rent: 'hidden',
    redirect: false,
}

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'Q_HOSPITAL':
            return Object.assign(
                {},
                state,
                { step_0_hospital_desc: 'show' }
            )
        case 'Q_PRODUCTION':
            return Object.assign(
                {},
                state,
                { step_0_hospital_price: 'show' }
            )
        case 'Q_DOCTOR':
            return Object.assign(
                {},
                state,
                { step_1_doctor_desc: 'show' }
            )
        case 'Q_CITY':
            return Object.assign(
                {},
                state,
                { step_3_city_house_rent: 'show' }
            )
        case 'A_HOSPITAL_ITEM_SELECT':
            return Object.assign(
                {},
                state,
                { redirect: true }
            )
        case 'A_RESET':
            return initialState
        default:
            return state
    }
}

export default uiReducer