const PeriodObject = {
    "realtime": ['5s', '10s', '15s', '30s'],
    "1min": ['1min', '5min', '10min', '15min'],
    "5min": ['5min', '10min', '15min'],
    "hour": ['hour'],
    "day": ['day'],
    "month": [],
    "year": [],
}

if (PeriodObject["realtime"]) {
    console.log(PeriodObject["realtime"])
}


if (PeriodObject["year"] && PeriodObject["year"].length !== 0) {
    console.log(PeriodObject["year"])
}

// Object의 변수 ? Key 값을 Array로 저장하기
const PeriodArray = Object.keys(PeriodObject)
console.log(PeriodArray)



const users = [
    { id: "admin", password: "password" }
]
const user = users.find((user) => user.id === 'adb' && user.password === 'asdf')
if (user === undefined) {
    console.log(user)
}
