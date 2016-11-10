/**
 * utils for find record
 */
export function mod(n, m) {
    const q = n % m;
    return q < 0 ? (q + m) : q;
}

export function getHospitalDetailByName(hospital_name, records) {
    let hospitalDetail = null
    for (var index = 0; index < records.length; index++) {
        if (records[index].hospital === hospital_name) {
            hospitalDetail = records[index]
        }
    }
    return hospitalDetail
}

export function getDoctorListByHospitalName(hospital_name, records) {
    let doctorList = null
    for (var index = 0; index < records.length; index++) {
        if (records[index].hospital === hospital_name) {
            doctorList = records[index].doctors
        }
    }
    return doctorList
}

export function getDoctorFromListByName(doctorList, name) {
    let doctor = null
    for (var index = 0; index < doctorList.length; index++) {
        if (doctorList[index].name === name) {
            doctor = doctorList[index]
        }
    }
    return doctor
}

export function getHouseDetailByHospitalAndHouseName(hospital_name, house_name, records) {
    let hospitalDetail = getHospitalDetailByName(hospital_name, records)
    let houseDetail = null
    for (var index = 0; index < hospitalDetail.cities.length; index++) {
        if (hospitalDetail.cities[index].name === house_name) {
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

export function strToCoordinate(str) {
    const arrayOfStrings = str.split(',')
    const geo = arrayOfStrings.map( (item) => {
        return parseFloat(item.trim())
    })
    return geo
}