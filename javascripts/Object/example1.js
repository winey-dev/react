// Object에서 특정 필드를 제외하고 Object를 복사 할 경우

const Object = {
  name: "이승민",
  age: 30,
  gender: "남자",
  id: "smlee",
  password: "smlee"
}

// id, password를 제외 하고 복사 하기
var {id, password, ...CopyObject} = Object
console.log(CopyObject)