let key = 0;

export function addRowData(d) {
    const row = {
        key: key++
    };
    return {
        type: "ROW_DATA_ADDED",
        payload: {
            row
        }
    }
}

export function removeRowData(keys) {
    return {
        type: "ROW_DATA_REMOVED",
        payload: {
            keys
        }
    }
}

export function editRowData(rowKey, columnKey, text) {
    return {
        type: "ROW_DATA_EDITED",
        payload: {
            rowKey, columnKey, text
        }
    }
}

export function fetchRowData(d, keyList) {

    const getRowData = el => {
        const o = {
            key: (key++).toString()
        };

        keyList.forEach(prop => {
            o[prop.split(/[\s]/).join("_")] = el.hasOwnProperty(prop) ? String(el[prop]) : '';
        });
        return o;
    };

    const rowData = Array.isArray(d) ? d.map(getRowData) : [getRowData(d)];
    return {
        type: "ROW_DATA_FULFILLED",
        payload: {
            rowData
        }
    }
}
