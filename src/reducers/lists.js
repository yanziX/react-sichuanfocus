const lists = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return [
                ...state,
                [action.result]
            ]
        default:
            return state
    }
}

export default lists