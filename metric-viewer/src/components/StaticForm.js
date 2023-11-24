import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import QueryBox from "./QueryBox";
import { CollectionsOutlined } from "@mui/icons-material";
const StaticForm = (props) => {
  const { uuid, id, name, client, queryBox, queryBoxIndex, onQueryBoxChange } =
    props;

  const menuList = client.getListWithMap(id, queryBox);

  const [value, setValue] = useState(queryBox.get(id));

  const onItemChange = (e) => {
    if (e.target.value) {
      setValue(e.target.value);
      onQueryBoxChange("ADD", queryBoxIndex, id, e.target.value);
    }
  };

  useEffect(() => {
    setValue(queryBox.get(id));
  }, [uuid]);

  return (
    <div>
      {menuList && (
        <FormControl sx={{ m: 1, minWidth: 140 }}>
          <InputLabel id={"".concat(id, "-label-id")}>
            {" ".concat(name, " ")}
          </InputLabel>
          <Select
            labelId={"".concat(id, "-label-id")}
            id={"".concat(id, "-id")}
            value={value}
            defaultValue={value}
            onChange={onItemChange}
            autoWidth
            label={name}
          >
            {menuList.map((item, index) => (
              <MenuItem id={item.name} index={index} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
};
export default StaticForm;
