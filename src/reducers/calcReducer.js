import calcPrice from '../services/calc'
const initialState = {
    hospital_name: '',
    production_type: '',
    doctor_name: '',
    city: '',
    stay_days: 60,
    house_type: '',
    need_care: false,
    car_type: '',
    total_price: 0,
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
        case 'Q_CITY':
            return Object.assign(
                {},
                state,
                { city: action.payload.value }
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
        case 'A_FINISH':
            const total_price = calcPrice(state)
            return Object.assign(
                {},
                state,
                { total_price: total_price }
            )
        default:
            return state
    }
}

export default calcReducer