const mediacalData = [
    {
        id: "30bd68a8-c55e-4f5c-8914-905a756a97f7",
        hospital: "Cedars-Sinai Medical Center",
        address: "8700 Beverly Blvd, Los Angeles, CA 90048",
        description: "Cedars-Sinai Medical Center",
        price: {
            normal: "21310 rmb",
            csection: "29600 rmb"
        },
        doctors: [
            {
                name: "Erica T.Wang",
                price_normal: "10000 rmb",
                csection: "20000 rmb"
            },
            {
                name: "Iiana Cass",
                price_normal: "10000 rmb",
                csection: "20000 rmb"
            },

            {
                name: "Bryna Harwood",
                price_normal: "10000 rmb",
                csection: "20000 rmb"
            },
            {
                name: "Sarah Kilpatrick",
                price_normal: "10000 rmb",
                csection: "20000 rmb"
            },
        ],
        cities: [
            {
                name: "Beverly Hills",
                room_2b1b: "5500 usd",
                room_1b1b: "4500 usd"
            },
            {
                name: "San Monica",
                room_2b1b: "7500 usd",
                room_1b1b: "5500 usd"
            }
        ],
    },
    {
        id: "fa1c7a56-6e97-48df-8fac-cce0544af7ed",
        hospital: " UCLA Medical Center",
        address: "757 Westwood Plaza, Los Angeles, CA 90095",
        description: " UCLA Medical Center",
        price: {
            normal: "16000 rmb",
            csection: "29000 rmb"
        },
        doctors: [
            {
                name: "Andrea Rapkin",
                price_normal: "10000 rmb",
                csection: "20000 rmb"
            },
            {
                name: "Angela Chen",
                price_normal: "10000 rmb",
                csection: "20000 rmb"
            },

            {
                name: "Robin Rarias-Eisner",
                price_normal: "10000 rmb",
                csection: "20000 rmb"
            },
        ],
        cities: [
            {
                name: "Beverly Hills",
                room_2b1b: "5500 usd",
                room_1b1b: "4500 usd"
            },
            {
                name: "San Monica",
                room_2b1b: "7500 usd",
                room_1b1b: "5500 usd"
            }
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

function getDoctorByHospital(hospital_name) {
    for (var index = 0; index < mediacalData.length; index++) {
        if (mediacalData[index].hospital === hospital_name) {
            return mediacalData[index].doctors
        }
    }
}

function calcPrice(state) {
    let total = 0
    let hospital = {}
    const re = /^\d+/
    //1. find hospital
    for (var index = 0; index < mediacalData.length; index++) {
        if (mediacalData[index].hospital === state.hospital_name) {
            hospital =  mediacalData[index]
        }
    }
    console.log(hospital)
    //2. find doctors
    let doctor = {}
    for (var i = 0; i < hospital['doctors'].length; i++) {
        if (hospital['doctors'][i].name === state.doctor_name) {
            doctor = hospital['doctors'][i]
        }
    }
    if (state.production_type === 'nature') {
        //add hospital cost
        let tmp = hospital['price']['normal'].match(re)[0]
        total += parseInt(tmp, 10)
        // add doctor cost
        tmp = doctor.price_normal.match(re)[0]
        total += parseInt(tmp, 10)
    } else {
        let tmp = hospital['price']['csection'].match(re)[0]
        total += parseInt(tmp, 10)
        tmp = doctor.csection.match(re)[0]
        total += parseInt(tmp, 10)
    }
    return total.toString()
}

export { mediacalData, miscData, getDoctorByHospital, calcPrice }

