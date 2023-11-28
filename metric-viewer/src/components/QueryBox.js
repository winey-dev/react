import { useEffect, useState, useRef } from "react";
import MUISelect from "./Select/MUISelect";
import uuid from 'react-uuid';
//  influxdb와 연동하여 데이터를 받아오는것 까지 성공함.
//  react에서는 이중배열을 선언할수는 없음 (몇각지 방식으로 사용할 수는 있지만 선언만 안됨)
//  이 문제로 multi select에서 오류가 발생
//  MUISelect 컴포넌트를 제작

const QueryBox = (props) => {
  const { client, queryBox, onQueryBoxChange, queryIndex } = props;

  // 각각의 Select Componetse에서 선택 가능한 OptionList들 
  // {name: "tagName" , multiple: false, values : []}
  const [ selectOptions, setSelectOptions ] = useState([
    {name: "category", multiple: false, values: ["resource", "rest"], selectedValues: ["resource"]},
    {name: "subcategory", multiple: false, values: ["node", "container", "network"], selectedValues: ["node"]},
 //   {name: "_field", multiple: true, values:["cpu_usage", "mem_usage", "disk_usage"]}
  ])
  
  
  const onChangeEvent = (value, index) => {
    const fetch = async () => {
      const changeSelected = [...selectOptions];
      const changeValue = typeof value === 'string' ? value.split(",") : value
      changeSelected[index].selectedValues = [...changeValue];
      /*함수 client.SchemaWithSelectOption(changeSelected, index)를 호출 해당 결과를 setSelectOptions 결과에 취합  */ 
      const newOptions = await client.schemaWithSelectOption(changeSelected, index)
      console.log(newOptions)
      setSelectOptions([...newOptions])
    }
    fetch();
  };

  return (
    <div>
      {selectOptions &&
        selectOptions.map((selectOption, index) => (
          <MUISelect 
          key={uuid()} 
          index = {index}
          selectOption={selectOption}
          onChangeEvent={onChangeEvent} 
           />
        ))}
    </div>
  );
};

export default QueryBox;
