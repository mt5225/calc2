const initialState = {
    finished: false,
    stepIndex: 0,
    nextBtnDisable: false,
}

const TOTAL_STEPS = 4

const stepReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'A_NEXT':
            if (state.stepIndex === 0 || state.stepIndex === 1) {
                return Object.assign(
                    {},
                    state,
                    {
                        stepIndex: state.stepIndex + 1,
                        finished: state.stepIndex >= TOTAL_STEPS,
                        nextBtnDisable: true,
                    }
                )
            } else {
                return Object.assign(
                    {},
                    state,
                    {
                        stepIndex: state.stepIndex + 1,
                        finished: state.stepIndex >= TOTAL_STEPS,
                        nextBtnDisable: false,
                    }
                )
            }
        case 'A_PREV':
            return Object.assign(
                {},
                state,
                {
                    stepIndex: state.stepIndex > 0 ? state.stepIndex - 1 : state.stepIndex,
                    nextBtnDisable: false,
                }
            )

        case 'A_ENABLE_NEXT':
            return Object.assign(
                {},
                state,
                {
                    nextBtnDisable: false,
                }
            )
        case 'A_DISABLE_NEXT':
            return Object.assign(
                {},
                state,
                {
                    nextBtnDisable: true,
                }
            )
        case 'A_RESET':
            return initialState
        default:
            return state
    }

}

export default stepReducer