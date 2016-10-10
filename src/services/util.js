import * as Data from './dataService'

export function getHospitalDetailByName(hospital_name) {
    let hospitalDetail = null
    for (var index = 0; index < Data.mediacalData.length; index++) {
        if (Data.mediacalData[index].hospital === hospital_name) {
            hospitalDetail = Data.mediacalData[index]
        }
    }
    return hospitalDetail
}

export function getDoctorListByHospitalName(hospital_name) {
    let doctorList = null
    for (var index = 0; index < Data.mediacalData.length; index++) {
        if (Data.mediacalData[index].hospital === hospital_name) {
            doctorList = Data.mediacalData[index].doctors
        }
    }
    return doctorList
}

export function canGoNext(currentAnsware, currentStep) {
    return {
        message: '请选择医院',
        status: false
    }
}