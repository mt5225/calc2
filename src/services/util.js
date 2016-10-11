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
    let result = {
        message: '',
        status: true
    }
    switch (currentStep) {
        case 0:
            if (currentAnsware.hospital_name.length < 1 || currentAnsware.production_type.length < 1) {
                result = {
                    message: '请先选择医院及生产方式',
                    status: false
                }
            }
            break
        case 1:
            if (currentAnsware.doctor_name.length < 1) {
                result = {
                    message: '请先选择医生',
                    status: false
                }
            }
            break
        case 3:
            if (currentAnsware.city.length < 1 || currentAnsware.house_type.length < 1) {
                result = {
                    message: '请先选择居住城市与房型',
                    status: false
                }
            }
            break
        case 4:
            if (currentAnsware.car_type.length < 1) {
                result = {
                    message: '请先选择出行方式',
                    status: false
                }
            }
            break
        default:

    }

    return result
}