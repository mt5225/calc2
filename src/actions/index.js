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

export const finishAction = () => {
    return {
        type: 'A_FINISH',
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