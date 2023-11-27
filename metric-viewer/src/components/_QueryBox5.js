import { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

//  QueryBox4 ->를 async를 사용하여 데이터를 받아오는 과정으로 변경이 목표 완료

const QueryBox = (props) => {
  const { client, queryBox, onQueryBoxChange, boxIndex } = props;

  const [categoryList, setCategoryList] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [tagNameList, setTagNameList] = useState([]);
  const [tagValueList, setTagValueList] = useState([]);
  const [tagSelectValues, setTagSelectValues] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await client.AsyncGetCategoryList();
      setCategoryList(response);
      setCategoryName(response[0]);
      onQueryBoxChange("ADD", boxIndex, "category", response[0]);
      console.log("categoryList", response);
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const response = await client.AsyncGetSubCategoryList(categoryName);
      setSubCategoryList(response);
      setSubCategoryName(response[0]);
      onQueryBoxChange("ADD", boxIndex, "subCategory", response[0]);
      console.log("subactegoryList", response);
    };
    fetch();
  }, [categoryName]);

  useEffect(() => {
    const fetch = async () => {
      const response = await client.AsyncGetTagNameList(categoryName, subCategoryName);
      setTagNameList(response);
    };
    fetch();
  }, [subCategoryName]);

  useEffect(() => {
    const fetch = async () => {
      const response = await client.AsyncGetTagValueList(categoryName, subCategoryName, tagNameList);
      setTagValueList(response);
    };
    fetch();
  }, [tagNameList]);

  const onCategoryChange = (e, index) => {
    if (e.target.value) {
      setCategoryName(e.target.value);
      onQueryBoxChange("ADD", index, "category", e.target.value);
    } else {
    }
  };

  const onSubCategoryChange = (e, index) => {
    if (e.target.value) {
      setSubCategoryName(e.target.value);
      onQueryBoxChange("ADD", index, "subCategory", e.target.value);
    } else {
    }
  };

  const onTagValuesChange = (e, index) => {
    const copyValues = [...tagSelectValues];
    const values = e.target.value;
    copyValues[index] = typeof values === "string" ? values.split(",") : values;
    setTagSelectValues(copyValues);
  };

  return (
    <div style={{ display: "flex" }}>
      {categoryList && (
        <FormControl sx={{ m: 1, minWidth: 140 }}>
          <InputLabel id="category-label-id">category</InputLabel>
          <Select
            labelId="category-label-id"
            id="category-id"
            value={categoryName}
            onChange={(e) => onCategoryChange(e, boxIndex)}
            autoWidth
            label="category"
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
          <InputLabel id="subCategory-label-id">sub category</InputLabel>
          <Select
            labelId="subCcategory-label-id"
            id="subCategory-id"
            value={subCategoryName}
            onChange={(e) => onSubCategoryChange(e, boxIndex)}
            autoWidth
            label="sub category"
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

      {tagNameList &&
        tagNameList.map((value, index) => (
          <FormControl sx={{ m: 1, minWidth: 140 }}>
            <InputLabel id={value + "-label-id"}>{value}</InputLabel>
            <Select
              labelId={value + "-label-id"}
              id={value + "-id"}
              multiple
              value=""
              onChange={(e) => onTagValuesChange(e, index)}
              autoWidth
              label={value}
            >
              {tagValueList[index] &&
                tagValueList[index].map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        ))}
    </div>
  );
};

export default QueryBox;

// category 선택
