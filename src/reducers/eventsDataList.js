export default function eventsDataList(state = [], action) {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return action.result
        default:
            return state
    }
}