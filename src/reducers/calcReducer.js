const initialState = {
    hospital_name: '',
    production_type: 'nature',
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
        default:
            return state
    }
}

export default calcReducer