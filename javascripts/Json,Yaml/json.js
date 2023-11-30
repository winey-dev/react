const value = {id: "admin", password: "admin"}
// 그냥 출력 하기
console.log(JSON.stringify(value))

// 이쁘게 출력 하기
console.log(JSON.stringify(value, null, 2))

// password 출력 안하기
const ignore = (key, value) => {
  // return undefined or value

  if (key === 'password') {
    return undefined;
  } 
  return value;
}
console.log(JSON.stringify(value, ignore, 2))