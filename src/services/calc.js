import * as Data from './dataService'

function usd2rmb(originStr, orginPrice) {
    return /USD$/.test(originStr) ? orginPrice * Data.USD_RATE : orginPrice
}

function calcPrice(state) {
    let total = 0
    let hospital = {}
    const re = /^\d+/
    //1. find hospital
    for (var index = 0; index < Data.mediacalData.length; index++) {
        if (Data.mediacalData[index].hospital === state.hospital_name) {
            hospital = Data.mediacalData[index]
        }
    }
    console.log(hospital)
    //2. find doctors
    let doctor = {}
    for (let i = 0; i < hospital['doctors'].length; i++) {
        if (hospital['doctors'][i].name === state.doctor_name) {
            doctor = hospital['doctors'][i]
        }
    }

    //3. calculate cost for hospital and doctor
    if (state.production_type === 'nature') {
        // hospital cost
        let originStr = hospital['price']['normal']
        let tmp = hospital['price']['normal'].match(re)[0]
        total += usd2rmb(originStr, parseInt(tmp, 10))

        //  doctor cost
        originStr = doctor.price_normal
        tmp = doctor.price_normal.match(re)[0]
        total += usd2rmb(originStr, parseInt(tmp, 10))
    } else {
        //hospital cost
        let originStr = hospital['price']['csection']
        let tmp = hospital['price']['csection'].match(re)[0]
        total += usd2rmb(originStr, parseInt(tmp, 10))
        //  doctor cost
        originStr = doctor.csection
        tmp = doctor.csection.match(re)[0]
        total += usd2rmb(originStr, parseInt(tmp, 10))
    }

    //4. caculate living fee 

    //4.1 get city
    let city = {}
    for (let i = 0; i < hospital['cities'].length; i++) {
        if (hospital['cities'][i].name === state.city) {
            city = hospital['cities'][i]
        }
    }
    console.log(city)
    let house_price = ''
    if (state.house_type === '1b1b') {
        house_price = city.room_1b1b
    } else {
        house_price = city.room_2b1b
    }

    let tmp = house_price.match(re)[0]
    let house_price_days = parseInt(state.stay_days, 10) * parseInt(tmp, 10) / 30
    console.log(house_price_days)
    
    total += usd2rmb(house_price, house_price_days)

    //4.2 if need care_price
    if(state.need_care) {
        total +=  6000 * Data.USD_RATE
    }

    //4.3 commute fee
    let commute_base_fee = 0
    if(state.car_type === 'uber') {
        commute_base_fee = 200
    } else {
        commute_base_fee = 1500
    }
    total += parseInt(state.stay_days, 10) * commute_base_fee / 30 * Data.USD_RATE 

    total = Math.round(total)

    return total.toString()
}

export default calcPrice