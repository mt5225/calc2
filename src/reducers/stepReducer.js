const initialState = {
    finished: false,
    stepIndex: 0,
}

const TOTAL_STEPS = 4

const stepReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'A_NEXT':
            return Object.assign(
                {},
                state,
                {
                    stepIndex: state.stepIndex + 1,
                    finished: state.stepIndex >= TOTAL_STEPS,
                }
            )

        case 'A_PREV':
            return Object.assign(
                {},
                state,
                {
                    stepIndex: state.stepIndex > 0 ? state.stepIndex - 1 : state.stepIndex,
                }
            )
        case 'A_RESET':
            return initialState
        default:
            return state
    }

}

export default stepReducer