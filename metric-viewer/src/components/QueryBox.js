import { useEffect, useState, useRef } from "react";
import { Button, Dialog, DialogTitle, DialogContent, Box, DialogActions, Divider } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import MUISelect from "./Select/MUISelect";
//  _field 부터는 선택 시 각 의존성이 존재하는 select values의 변경을 완성함
// 그러나 아직 multiple select에서 아이템을하나 클릭시 re-render링 되는 문제를 해결하지 못함 ...
// 실제 변경은 useRef으로 하고 ... useRef를useEffect로 감지한다음에 useState를 이용해서 ... re-render 조건을 달지....

const QueryBox = (props) => {
  const { client, onQueryBoxChange, queryIndex, removeOnClick } = props;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  }
  // 각각의 Select Componetse에서 선택 가능한 OptionList들 
  // {name: "tagName" , multiple: false, values : []}

  const [selectOptions, setSelectOptions] = useState([
    // {name: "category", multiple: false, values: ["resource", "rest"], selectedValues: ["resource"]},
    // {name: "subcategory", multiple: false, values: ["node", "container", "network"], selectedValues: ["node"]},
    //   {name: "_field", multiple: true, values:["cpu_usage", "mem_usage", "disk_usage"]}
  ])

  useEffect(() => {
    const fetch = async () => {
      const newOptions = await client.InitalizeOptions(null, null)
      setSelectOptions(newOptions)
      onQueryBoxChange(newOptions, queryIndex)

    }

    fetch()


  }, [])


  const onChangeEvent = (value, index) => {
    const fetch = async () => {
      const changeSelected = [...selectOptions];
      const changeValue = typeof value === 'string' ? value.split(",") : value
      changeSelected[index].selectedValues = [...changeValue];
      /*함수 client.SchemaWithSelectOption(changeSelected, index)를 호출 해당 결과를 setSelectOptions 결과에 취합  */
      const newOptions = await client.schemaWithSelectOption(changeSelected, index)
      setSelectOptions([...newOptions])

      onQueryBoxChange(newOptions, queryIndex)
      console.log(newOptions)
    }
    fetch();
  };


  const additional = (options) => {
    for (let i = 0; i < options.length; i++) {
      if (options[i].additional) {
        return true;
      }
    }
    return false;
  }


  return (
    <div style={{ display: 'flex', padding: 2, flexDirection: 'row', justifyContent: "space-between" }}>
      <div >
        <Box
          sx={{
            m: 1,
            minWidth: 120,
          }}
        >
          {selectOptions &&
            selectOptions.map((selectOption, index) => (
              <>

                {!selectOption.additional &&
                  <MUISelect
                    key={selectOption.name}
                    index={index}
                    selectOption={selectOption}
                    onChangeEvent={onChangeEvent}
                  />
                }
              </>
            ))}
        </Box>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {selectOptions && additional(selectOptions) &&
          <>
            <Button onClick={handleClickOpen}>ADDITIONAL</Button>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
              <DialogTitle>Additinal Select</DialogTitle>
              <DialogContent>
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                  {selectOptions.map((selectOption, index) => (
                    <>
                      {selectOption.additional &&
                        <MUISelect
                          key={selectOption.name}
                          index={index}
                          selectOption={selectOption}
                          onChangeEvent={onChangeEvent}
                        />

                      }
                    </>
                  ))
                  }
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Ok</Button>
              </DialogActions>
            </Dialog>
          </>
        }
        <IconButton onClick={() => removeOnClick(queryIndex)}>
          <RemoveIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default QueryBox;
