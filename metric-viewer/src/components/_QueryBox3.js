import { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
// useEffect로 조회 결과를 연결하여 select list를 만드는 코드 ... /// 실패
const QueryBox = (props) => {
  const { id, client, queryBox, onQueryBoxChange, boxIndex } = props;

  const categoryList = ["resource", "rest"];
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [tagNameList, setTagNameList] = useState([]);
  const [tagValueList, setTagValueList] = useState([]);

  useEffect(() => {
    console.log("카테고리 리스트 변경 감지", categoryList, "기본 카테고리 명 설정 ", categoryList[0]);
    setCategoryName(categoryList[0]);
  }, [categoryList]);

  useEffect(() => {
    var inSubList = [];
    if (categoryName === "resource") {
      inSubList = ["node", "container", "network"];
    } else if (categoryName === "rest") {
      inSubList = ["grpc", "http"];
    } else {
      inSubList = [];
    }
    setSubCategoryList(inSubList);
    console.log("카테고리명 변경 감지 %s", categoryName, "서브 카테고리 리스트 갱신 : ", inSubList);
  }, [categoryName]);

  useEffect(() => {
    setSubCategoryName(subCategoryList[0]);
    console.log("서브 카테고리 리스트 변경 감지", subCategoryList, "기본 서브 카테고리 명 설정 ", subCategoryList[0]);
  }, [subCategoryList]);

  useEffect(() => {
    var inTagList = [];
    if (categoryName === "resource") {
      if (subCategoryName === "node") {
        inTagList = [("item_name", "node_name")];
      } else if (subCategoryName === "container") {
        inTagList = [("item_name", "namespace", "app_name", "pod_name", "container_name")];
      } else if (subCategoryName === "network") {
        inTagList = [("item_name", "namespace", "app_name", "pod_name", "interface")];
      }
    } else if (categoryName === "rest") {
      if (subCategoryName === "grpc") {
        inTagList = ["item_name", "namespace", "app_name", "pod_name", "container_name", "method", "status"];
      } else if (subCategoryName === "http") {
        inTagList = [("item_name", "namespace", "app_name", "pod_name", "container_name", "url", "method", "status")];
      }
    } else {
      inTagList = [];
    }
    setTagNameList(inTagList);
  }, [subCategoryName]);

  useEffect(() => {
    const tagValues = [];
    for (let i = 0; i < tagNameList.length; i++) {
      tagValues.push(["item1", "item2", "item3", "item4", "item5"]);
    }
    setTagValueList(tagValues);
  }, [tagNameList]);

  const onCategoryChange = (e, index) => {
    if (e.target.value) {
      setCategoryName(e.target.value);
      onQueryBoxChange("UPDATE", index, "category", "e.target.value");
    }
  };

  const onSubCateoryChange = (e, index) => {
    if (e.target.value) {
      setSubCategoryName(e.target.value);
      onQueryBoxChange("UPDATE", index, "subcategory", "e.target.value");
    }
  };

  const onTagValueSelect = (e, index) => {
    if (e.target.values) {
    }
  };

  return (
    <div uuid={id} style={{ display: "flex" }}>
      {categoryList && (
        <FormControl sx={{ m: 1, minWidth: 140 }}>
          <InputLabel id="category-label-id">Category</InputLabel>
          <Select
            labelId="category-label-id"
            id="category-id"
            value={categoryName}
            onChange={(e) => onCategoryChange(e, boxIndex)}
            autoWidth
            label="Category"
          >
            {categoryList &&
              categoryList.map((item, key) => (
                <MenuItem index={key} id={item} value={item}>
                  {item}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      )}

      {subCategoryList && (
        <FormControl sx={{ m: 1, minWidth: 140 }}>
          <InputLabel id="subCategory-label-id">SubCategory</InputLabel>
          <Select
            labelId="subCcategory-label-id"
            id="subCategory-id"
            value={subCategoryName}
            onChange={(e) => onSubCateoryChange(e, boxIndex)}
            autoWidth
            label="Category"
          >
            {subCategoryList &&
              subCategoryList.map((item, key) => (
                <MenuItem index={key} id={item} value={item}>
                  {item}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
};

export default QueryBox;

// category 선택
