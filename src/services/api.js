const LOCAL = {
    IP: 'localhost',
    PORT: '4040'
}
const QA = {
    IP: 'qa.mt5225.com',
    PORT: '4040'
}

const PROD = {
    IP: 'mt5225.com',
    PORT: '4040'
}

//const BACKEND_URL = LOCAL.IP + ':' + LOCAL.PORT
//const BACKEND_URL = QA.IP + ':' + QA.PORT
const BACKEND_URL = PROD.IP + ':' + PROD.PORT



/**
 * fetch booking record for data range
 */
export function fetchHospitalRecord() {
    const url = "http://" + BACKEND_URL + "/api/hospitals"
    return fetch(url, {
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        method: 'GET',
    })
}