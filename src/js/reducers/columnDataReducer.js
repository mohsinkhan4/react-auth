export default function reducer(state={
    columnData: [],
    fetching: false,
    fetched: false,
    error: null,
}, action) {

    switch (action.type) {
        case "COLUMN_DATA_FULFILLED": {
            const { columnData } = state;
            return {
                ...state,
                fetching: false,
                fetched: true,
                columnData: action.payload,
            }
        }
        case "COLUMN_DATA_ADDED": {
            const { columnData } = state;
            return {
                ...state,
                fetching: false,
                fetched: true,
                columnData: columnData.concat(action.payload),
            }
        }
    }

    return state
}
