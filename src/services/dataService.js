const USD2RMB = 6.8

const mediacalData = [
    {
        id: "30bd68a8-c55e-4f5c-8914-905a756a97f7",
        hospital: "Cedars-Sinai Medical Center",
        hospital_cn: "雪松西奈山",
        address: "8700 Beverly Blvd, Los Angeles, CA 90048",
        description: "Cedars-Sinai Medical Center",
        price: {
            normal: "21310 rmb",
            csection: "29600 rmb"
        },
        doctors: [
            {
                name: "Erica T.Wang",
                price_normal: "2500 usd",
                csection: "2500 usd"
            },
            {
                name: "Iiana Cass",
                price_normal: "2500 usd",
                csection: "2500 usd"
            },

            {
                name: "Bryna Harwood",
                price_normal: "2500 usd",
                csection: "2500 usd"
            },
            {
                name: "Sarah Kilpatrick",
                price_normal: "2500 usd",
                csection: "2500 usd"
            },
        ],
        cities: [
            {
                name: "Beverly Hills",
                room_2b1b: "5500 usd",
                room_1b1b: "5000 usd"
            },
            {
                name: "San Monica",
                room_2b1b: "5500 usd",
                room_1b1b: "5000 usd"
            }
        ],
    },
    {
        id: "fa1c7a56-6e97-48df-8fac-cce0544af7ed",
        hospital: " UCLA Medical Center",
        hospital_cn: "加州大学洛杉矶分校医疗中心",
        address: "757 Westwood Plaza, Los Angeles, CA 90095",
        description: " UCLA Medical Center",
        price: {
            normal: "16000 rmb",
            csection: "29000 rmb"
        },
        doctors: [
            {
                name: "Andrea Rapkin",
                price_normal: "2500 usd",
                csection: "2500 usd"
            },
            {
                name: "Angela Chen",
                price_normal: "2500 usd",
                csection: "2500 usd"
            },

            {
                name: "Robin Rarias-Eisner",
                price_normal: "2500 usd",
                csection: "2500 usd"
            },
        ],
        cities: [
            {
                name: "Beverly Hills",
                room_2b1b: "5500 usd",
                room_1b1b: "5000 usd"
            },
            {
                name: "San Monica",
                room_2b1b: "5500 usd",
                room_1b1b: "5000 usd"
            }
        ],
    },
    {
        id: "0ae7d4a2-68b2-4c4d-bcbd-3fbeaa2d90b0",
        hospital: "Huntington Memorial Hospital",
        hospital_cn: "亨廷顿医院",
        address: "100 W California Blvd, Pasadena, CA 91105",
        description: "Huntington Memorial Hospital",
        price: {
            normal: "4724 rmb",
            csection: "9143 rmb"
        },
        doctors: [
            {
                name: "Cindy Chou 周黄心滢",
                price_normal: "2500 usd",
                csection: "2500 usd"
            },
            {
                name: "Doryth C Hong 洪淳",
                price_normal: "2500 usd",
                csection: "2500 usd"
            },
            {
                name: "Shaun P.Grandy",
                price_normal: "2500 usd",
                csection: "2500 usd"
            },
            {
                name: "Bryan Jick",
                price_normal: "3900 usd",
                csection: "4800 usd"
            },
            {
                name: "Eleanor Leung",
                price_normal: "3000 usd",
                csection: "3000 usd"
            },
            {
                name: "Deborah Yu",
                price_normal: "1900 usd",
                csection: "2700 usd"
            },
            {
                name: "John C Chiang 江昭璋",
                price_normal: "1800 usd",
                csection: "2500 usd"
            },
            {
                name: "Tsang Hung Chang 张赞煌顺",
                price_normal: "1100 usd",
                csection: "1600 usd"
            },
        ],
        cities: [
            {
                name: "Pasadena",
                room_2b1b: "5000 usd",
                room_1b1b: "4500 usd"
            },
            {
                name: "Glendale",
                room_2b1b: "5000 usd",
                room_1b1b: "4500 usd"
            },
            {
                name: "Arcadia",
                room_2b1b: "5000 usd",
                room_1b1b: "4500 usd"
            },
            {
                name: "Ahambra",
                room_2b1b: "4000 usd",
                room_1b1b: "3500 usd"
            },
            {
                name: "San Gabriel",
                room_2b1b: "4000 usd",
                room_1b1b: "3500 usd"
            },
            {
                name: "Temple City",
                room_2b1b: "4000 usd",
                room_1b1b: "3500 usd"
            },
        ],
    },
]

const miscData = {
    care_price: "4500 usd",
    living_price: "33.3 usd",
    car: {
        public: "6.7 usd",
        rent: "50 usd",
    }
}



function usd2rmb(originStr, orginPrice) {
    return /usd$/.test(originStr) ? orginPrice * USD2RMB : orginPrice
}

function calcPrice(state) {
    let total = 0
    let hospital = {}
    const re = /^\d+/
    //1. find hospital
    for (var index = 0; index < mediacalData.length; index++) {
        if (mediacalData[index].hospital === state.hospital_name) {
            hospital = mediacalData[index]
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
        total +=  6000 * USD2RMB
    }

    //4.3 commute fee
    let commute_base_fee = 0
    if(state.car_type === 'uber') {
        commute_base_fee = 200
    } else {
        commute_base_fee = 1500
    }
    total += parseInt(state.stay_days, 10) * commute_base_fee / 30 * USD2RMB 

    total = Math.round(total)

    return total.toString()
}

export { mediacalData, miscData, calcPrice }

