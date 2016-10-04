const initialState = {
    hospital_name: 'Cedars-Sinai Medical Center',
    production_type: 'nature',
    doctor_name: '',
    stay_days: '',
    house_type: '1b1b',
    need_care: false,
    car_type: 'uber',
    calc_result: 0,
}


const calcReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'Q_HOSPITAL':
            return Object.assign(
                {},
                state,
                { hospital_name: action.payload.value }
            )
        case 'Q_PRODUCTION':
            return Object.assign(
                {},
                state,
                { production_type: action.payload.value }
            )
        case 'Q_DOCTOR':
            return Object.assign(
                {},
                state,
                { doctor_name: action.payload.value }
            )
        case 'Q_DAYS':
            return Object.assign(
                {},
                state,
                { stay_days: action.payload.value }
            )
        case 'Q_HOUSE':
            return Object.assign(
                {},
                state,
                { house_type: action.payload.value }
            )
        case 'Q_CARE':
            return Object.assign(
                {},
                state,
                { need_care: action.payload.value }
            )
        case 'Q_CAR':
            return Object.assign(
                {},
                state,
                { car_type: action.payload.value }
            )
        case 'A_RESET':
            return initialState
        default:
            return state
    }
}

export default calcReducer