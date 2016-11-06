//const BASE_URL = 'localhost'
const BASE_URL = '52.53.191.1'

/**
 * load all the data from backend service
 */



/**
 * fetch booking record for data range
 */
export function fetchHospitalRecord() {
    const url = "http://" + BASE_URL + ":4040/api/hospitals"
    return fetch(url, {
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        method: 'GET',
    })
}