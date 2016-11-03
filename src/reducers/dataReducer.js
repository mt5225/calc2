/**
 * reducer to hold hospital records
 */

const initialState = {
    records: {},
    ifReady: false
}

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'E_REQ_FAILED':
            return Object.assign(
                {},
                state,
                { ifReady: false }
            )
        case 'E_REQ_SUCCESS':
            return Object.assign(
                {},
                state,
                {
                    ifReady: true,
                    records: action.payload
                }
            )
        default:
            return state
    }

}

export default dataReducer