function reducer( state = {
    rowData: [],
    creating: false, created: false,
    reading: false,  read: false,
    updating: false,  updated: false,
    deleting: false,  deleted: false,
    error: null,
}, action) {

    switch (action.type) {

        case "ROW_DATA_FULFILLED": {
            const { rowData } = action.payload;

            return {
                ...state,
                rowData,
                created: false, reading: false, read: true, updated: false, deleted: false
            }
        }

        case "ROW_DATA_ADDED": {
            const { rowData } = state;
            const { row } = action.payload;

            return {
                ...state,
                rowData: [row].concat(rowData), //to add to the start of the collection. For adding to the end use 'rowData.concat(row)'
                creating: false, created: true, read: false, updated: false, deleted: false
            }
        }

        case "ROW_DATA_REMOVED": {
            const { rowData } = state;
            const { keys } = action.payload;

            return {
                ...state,
                rowData: rowData.filter(
                    row => !keys.has(row.key)
                ),
                created: false, read: false, updated: false, deleting: false, deleted: true
            }
        }

        case "ROW_DATA_EDITED": {
            const { rowData } = state;
            const { rowKey, columnKey, text } = action.payload;

            return {
                ...state,
                rowData: rowData.map(row =>
                    {
                        if(rowKey === row.key) {
                            row[columnKey] = text;
                        }
                        return row;
                    }
                ),
                created: false, read: false, updating: false, updated: true, deleted: false
            }
        }
    }

    return state
}

export default reducer
