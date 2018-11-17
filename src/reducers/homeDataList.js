


export default function homeDataList(state = [], action) {
        switch (action.type) {
            case 'FETCH_SUCCESS':
                return action.result
            default:
                return state
        }
  }