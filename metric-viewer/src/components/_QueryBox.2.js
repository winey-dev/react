import { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import DynamicForm from "./_DynamicForm";
import StaticForm from "./_StaticForm";
const QueryBox = (props) => {
  return (
    <div style={{ display: "flex" }}>
      {selectItemList &&
        selectItemList.map((value, index) => (
          <FormControl key={index} sx={{ m: 1, minWidth: 140 }}>
            <InputLabel id={"".concat(value.name, "-label-id")}>{" ".concat(value.name, " ")}</InputLabel>
            <Select
              labelId={"".concat(value.name, "-label-id")}
              id={value.name}
              value={selectItem[index].values}
              multiple={selectItem[index].multiple}
              onChange={(e) => onItemChange(e, index)}
              autoWidth
              label={value.name}
            >
              {value.itemList &&
                value.itemList.map((item, itemIndex) => (
                  <MenuItem id={item} index={itemIndex} value={item}>
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
