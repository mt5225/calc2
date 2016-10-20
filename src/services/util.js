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

export function getDoctorFromListByName(doctorList, name) {
    let doctor = null
    for(var index = 0; index < doctorList.length; index++) {
        if(doctorList[index].name === name) {

            doctor = doctorList[index]
        }
    }
    return doctor
}

export function getHouseDetailByHospitalAndHouseName (hospital_name, house_name) {
    let hospitalDetail = getHospitalDetailByName(hospital_name)
    let houseDetail = null
    for (var index = 0; index < hospitalDetail.cities.length; index++) {
        if ( hospitalDetail.cities[index].name === house_name) {
            houseDetail = hospitalDetail.cities[index]
        }
    }
    return houseDetail
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
                    message: '请先选择生产方式',
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