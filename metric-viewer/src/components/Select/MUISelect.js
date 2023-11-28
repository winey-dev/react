import { FormControl, Select, MenuItem, ListItemText, Checkbox, InputLabel } from "@mui/material";


const MUISelect = (props) => {
  // props로 전달 받은 내용
  const {index, selectOption, onChangeEvent} = props;

 
  const options = selectOption.values.map((item, index) => {
    return (
      <MenuItem key={index} value={item}>
         {selectOption.multiple ? 
         <>
          <Checkbox checked={selectOption.values.indexOf(item) > -1} />
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
          <InputLabel id={selectOption.name + "-label-id"}>{selectOption.name}</InputLabel>
          <Select
            labelId={selectOption.name + "-label-id"}
            id={selectOption.name + "-id"}
            onChange={(e) => onChangeEvent(e.target.value, index)}
            autoWidth
            label={selectOption.name}
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
