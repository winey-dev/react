import { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

//  influxdb와 연동하여 데이터를 받아오는것 까지 성공함.
//  react에서는 이중배열을 선언할수는 없음 (몇각지 방식으로 사용할 수는 있지만 선언만 안됨)
//  이 문제로 multi select에서 오류가 발생 

const QueryBox = (props) => {
  const { client, queryBox, onQueryBoxChange, boxIndex } = props;

  const [categoryList, setCategoryList] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [tagNameList, setTagNameList] = useState([]);
  const [tagValueList, setTagValueList] = useState([]);
  const [tagSelectValues, setTagSelectValues] = useState([['a','b']]);

  useEffect(() => {
    const fetch = async () => {
      const response = await client.GetCategoryList();
      setCategoryList(response);
      setCategoryName(response[0]);
      onQueryBoxChange("ADD", boxIndex, "category", response[0]);
      console.log("categoryList", response);
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const response = await client.GetSubCategoryList(categoryName);
      setSubCategoryList(response);
      setSubCategoryName(response[0]);
      onQueryBoxChange("ADD", boxIndex, "subCategory", response[0]);
    };
    fetch();
  }, [categoryName]);

  useEffect(() => {
    const fetch = async () => {
      const response = await client.GetTagNameList(categoryName, subCategoryName);
      setTagNameList(response);
    };
    fetch();
  }, [subCategoryName]);

  useEffect(() => {
    const fetch = async () => {
      const values = [];
      for (let i = 0; i < tagNameList.length; i++) {
        const response = await client.GetTagValues(categoryName, subCategoryName, tagNameList[i]);
        values.push(response);
      }
       setTagValueList(values);
    };
    fetch();
  }, [tagNameList]);

  const onCategoryChange = (e, index) => {
    if (e.target.value) {
      setCategoryName(e.target.value);
      onQueryBoxChange("ADD", index, "category", e.target.value);
    }
  };

  const onSubCategoryChange = (e, index) => {
    if (e.target.value) {
      setSubCategoryName(e.target.value);
      onQueryBoxChange("ADD", index, "subCategory", e.target.value);
    }
  };

  const onTagValuesChange = (e, index) => {
    const copyValues = [...tagSelectValues];
    const values = e.target.value;
    copyValues[index] = typeof values === "string" ? values.split(",") : values;
    setTagSelectValues(copyValues);
    onQueryBoxChange("UPDATE", boxIndex, tagNameList[index], typeof values === "string" ? values.split(",") : values)
  };



  const SetTagName = (value) => {
    return value === "_field" ? "item_name" : value
  }

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

      {tagNameList && tagValueList && 
        tagNameList.map((value, index) => (
          <FormControl sx={{ m: 1, minWidth: 140 }}>
            <InputLabel id={value + "-label-id"}>{SetTagName(value)}</InputLabel>
            <Select labelId={value + "-label-id"} id={value + "-id"} multiple value={} onChange={(e) => onTagValuesChange(e, index)} autoWidth label={SetTagName(value)}>
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

