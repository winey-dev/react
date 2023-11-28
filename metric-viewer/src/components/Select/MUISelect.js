import { FormControl, Select, MenuItem, ListItemText, Checkbox, InputLabel } from "@mui/material";


const MUISelect = (props) => {
  // props로 전달 받은 내용
  const {index, selectOption, onChangeEvent} = props;
  const name = selectOption.name === "_field" ? "item_name" : selectOption.name
  const options = selectOption.values.map((item, index) => {
    return (
      <MenuItem key={index} value={item}>
         {selectOption.multiple ? 
         <>
          <Checkbox checked={selectOption.selectedValues.indexOf(item) > -1} />
            <ListItemText primary={item} />
         </>:
         <>
         {item}
         </>
           }
      </MenuItem>
    )
  })

  return (
        <FormControl sx={{ m: 1, minWidth: 140 }}>
          <InputLabel id={name + "-label-id"}>{name}</InputLabel>
          <Select
            labelId={name + "-label-id"}
            id={name + "-id"}
            onChange={(e) => onChangeEvent(e.target.value, index)}
            label={name}
            multiple={selectOption.multiple}
            value={selectOption.selectedValues}
            renderValue={(selected) => selected.join(", ")}
          >
            {options && options}
          </Select>
        </FormControl>
      
    
  );
};
export default MUISelect;
