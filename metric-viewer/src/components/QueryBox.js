import { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import DynamicForm from "./DynamicForm";
import StaticForm from "./StaticForm";
const QueryBox = (props) => {
    const { id, client, onQueryBoxChange, boxIndex } = props;
    const categoryList = client.getCategoryList();
    const subCategoryList = client.getSubCategoryList(categoryList[0].name)
    const tagNameList = client.getTagNameList(categoryList[0].name, subCategoryList[0].name)

 
    const [selectItemList, setSelectItemList] = useState(
    //     [
    //     { "name": "category", "multiple": false, "itemList": ["resource", "rest"] },
    // ]
    )

    const [selectItem, setSelectItem] = useState([
       
    ])



    
    // 처음 랜더링 될때 SelectItemList를 Set 해줌 
    useEffect(()=> {
        
        setSelectItemList([
            { "name": "category", "multiple": false, "itemList": categoryList },
            { "name": "category", "multiple": false, "itemList": subCategoryList },
        ])
        // category list, subcategortyList, tagnameList를 설정햊움 
        // eventMessage를 전송 
        
    }, [categoryList, subCategoryList])


    const onItemChange = (e, index) => {
        if (e.target.value) {
            const copySelectItem = [...selectItem]
            if (!copySelectItem[index].multiple) {
                copySelectItem[index].values[0] = e.target.value
                setSelectItem(copySelectItem)
                onSelectEvent({ 
                    "index": index, 
                    "name": copySelectItem[index].name, 
                    "multiple": copySelectItem[index].multiple, 
                    "values": [e.target.value] })
            }
        }
    }

    const onSelectEvent = (eo) => {
        // INDEX + 1 의 List를 갱신 
        //  
    }

    // selectItemList가 Set 될때 Default selectItem을 선택 해줌 
    useEffect(()=> {
        if (!selectItemList[0].multiple) {
            // 단일 select 일때만 Default Value를 설정 해줌 
            setSelectItem(selectItemList[0].itemList[0])
            onSelectEvent()
        }
      
    },[selectItemList])





    return (
        <div style={{ display: "flex" }}>
            {selectItemList && selectItemList.map((value, index) => (
                <FormControl key={index} sx={{ m: 1, minWidth: 140 }}>
                    <InputLabel id={"".concat(value.name, "-label-id")}>
                        {" ".concat(value.name, " ")}
                    </InputLabel>
                    <Select
                        labelId={"".concat(value.name, "-label-id")}
                        id={value.name}
                        value={selectItem[index].values}
                        multiple={selectItem[index].multiple}
                        onChange={(e) => onItemChange(e, index)}
                        autoWidth
                        label={value.name}
                    >
                        {value.itemList && value.itemList.map((item, itemIndex) => (
                            <MenuItem id={item} index={itemIndex} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ))
            }
        </div>
    );
};

export default QueryBox;


// category 선택 