import { useEffect, useState } from "react";
import MUISelect from "./Select/MUISelect";
import uuid from 'react-uuid';
//  _field 부터는 선택 시 각 의존성이 존재하는 select values의 변경을 완성함
// 그러나 아직 multiple select에서 아이템을하나 클릭시 re-render링 되는 문제를 해결하지 못함 ...
// 실제 변경은 useRef으로 하고 ... useRef를useEffect로 감지한다음에 useState를 이용해서 ... re-render 조건을 달지....

const QueryBox = (props) => {
  const { client, onQueryBoxChange, queryIndex} = props;

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
      console.log(newOptions)   
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
      console.log(newOptions)
      setSelectOptions([...newOptions])
      onQueryBoxChange(newOptions, queryIndex)
      
    }
    fetch();
  };

  return (
    <div>
      {selectOptions &&
        selectOptions.map((selectOption, index) => (
          <MUISelect
            key={uuid()}
            index={index}
            selectOption={selectOption}
            onChangeEvent={onChangeEvent}
          />
        ))}
    </div>
  );
};

export default QueryBox;
