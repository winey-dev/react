console.log("example1 start")
// Object Array에서 특정 KEY의 VALUE 값을가지는 Index를 반환 해야 하는 경우
// 중복된 값에 대해서는 찾을 수 없음
const ObjectArray = [
  {name:"category", value:10},
  {name:"subcategory", value:20},
  {name: "group", value:30},
  {name: "groupMerged", value:40}
]
const categoryIndex = ObjectArray.findIndex(value => value.name === "category")
const subCategoryIndex = ObjectArray.findIndex(value => value.name === "subcategory")
const groupIndex = ObjectArray.findIndex(value => value.name === "group")
const groupMergedIndex = ObjectArray.findIndex(value => value.name === "groupMerged")

const multiFind = ObjectArray.findIndex(value => value.name === "group" && value.value === 30)
console.log(categoryIndex,subCategoryIndex,groupIndex,groupMergedIndex)