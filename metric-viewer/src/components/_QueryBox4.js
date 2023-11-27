import { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
// 잘 실 행 됬던 코드
const QueryBox = (props) => {
  const { client, queryBox, onQueryBoxChange, boxIndex } = props;
  const categoryList = client.GetCategoryList();
  const [subCategoryList, setSubCategoryList] = useState(client.GetSubCategoryList(categoryList[0]));
  const [tagNameList, setTagNameList] = useState(client.GetTagNameList(categoryList[0], subCategoryList[0]));

  const [categoryName, setCategoryName] = useState(categoryList[0]);
  const [subCategoryName, setSubCategoryName] = useState(subCategoryList[0]);

  const onCategoryChange = (e, index) => {
    if (e.target.value) {
      setCategoryName(e.target.value);
      // 원래 위치 .. 이때 동작은 잘됨
      const inSubList = client.GetSubCategoryList(e.target.value);
      setSubCategoryList(inSubList);
      setSubCategoryName(inSubList[0]);
    } else {
      console.log("category index:%d, e.target.value is nil", index);
    }
  };

  const onSubCateoryChange = (e, index) => {
    if (e.target.value) {
      setSubCategoryName(e.target.value);
      setTagNameList(client.GetTagNameList(categoryName, e.target.value));
    } else {
      console.log("subCategory index:%d, e.target.value is nil", index);
    }
  };

  useEffect(() => {
    onQueryBoxChange("UPDATE", boxIndex, "category", categoryName);
    setSubCategoryList(client.GetSubCategoryList(categoryName));
  }, [categoryName]);

  useEffect(() => {
    setSubCategoryName(subCategoryList[0]);
  }, [subCategoryList]);

  useEffect(() => {
    onQueryBoxChange("UPDATE", boxIndex, "subcategory", subCategoryName);
  }, [subCategoryName]);

  return (
    <div style={{ display: "flex" }}>
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
                <MenuItem key={item} value={item}>
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
              subCategoryList.map((item) => (
                <MenuItem key={item} value={item}>
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
