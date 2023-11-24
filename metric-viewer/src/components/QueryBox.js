import { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import DynamicForm from "./DynamicForm";
import StaticForm from "./StaticForm";
const QueryBox = (props) => {
  const { id, client, queryBox, onQueryBoxChange, index } = props;
  console.log(index, queryBox);
  return (
    <div style={{ display: "flex" }}>
      <StaticForm
        uuid={id}
        id="category"
        name="Category"
        client={client}
        queryBox={queryBox}
        queryBoxIndex={index}
        onQueryBoxChange={onQueryBoxChange}
      />
      {/* 
      <StaticForm
        id="subCategory"
        name="SubCategory"
        client={client}
        queryBox={queryBox}
        queryBoxIndex={index}
        onQueryBoxChange={onQueryBoxChange}
      /> */}

      {/* {tagNameList && (
        <DynamicForm
          client={client}
          onQueryBoxChange={onQueryBoxChange}
          tagNameList={tagNameList}
        />
      )} */}
    </div>
  );
};

export default QueryBox;

// Category, SubCategory Select Box를 출력
// Category 변경시 SubCategoryList가 변경 되야함
// SubCategory 선택시 Tag 목록이 변경 되야함
// - 특정 우선순위가 존재하는 Tag 목록을 전달 받아 Select 컴포넌트가 추가 되야 한다.
//   + 만약 입력받은 순서는 (app_name, container_name, _field, namespace, pod_name) 라고 가정하면
//   + 내부 정렬 로직에 의해 (item_name<_field>, namespace, app_name, pod_name, container_name) 순으로 select 컴포넌트를 생성
// - 우선순위가 높은 Select 박스에 선택된 values가 변경되면 그보다 우선순위가 낮은 Select 컴포넌트의 List가 변경 되야함
//   + namespace Select 컴포넌트는 app_name Select 컴포넌트 보다 우선순의를 가지고 있다.
//   + namespace의 Select 컴포넌트의 ValueList {YUDORI, YADORI} 가 존재 한다.
//   + app_name의 Select 컴포넌의 ValueList {YUDORI-API-SERVER, YUDORI-CORE, YUDORI-MARIADB, YADORI-MARIADB, YADORI-APP} 으로 구성 되어 있다.
//   + namespace의 Select 컴포넌트의 Value가 모두 선택 되어 있으면 app_name Select 컴포넌트의  ValueList는 {YUDORI-API-SERVER, YUDORI-CORE, YUDORI-MARIADB, YADORI-MARIADB, YADORI-APP} 이다.
//   + namespace의 Select 컴포넌트의 Value로 YUDORI 만 선택 되어 있으면 app_name Select 컴포넌트의 ValueList는 {YUDORI-API-SERVER, YUDORI-CORE, YUDORI-MARIADB}
//   + namespace의 Select 컴포넌트의 Value로 YADORI 만 선택 되어 있으면 app_name Select 컴포넌트의 ValueList는 {YADORI-MARIADB, YADORI-APP}
//   + 만약 namespace의 Select 컴포넌트의 Value로 모든 namespace가 선택되어 있고 app_name의 Select 컴포넌트의 Value는 {YUDORI-MARIADB, YADORI-MARIADB} 선택 되어있다고 가정 할 때
//   + namespace Select 컴포넌트의 Value가 YADORI 만 선택 하도록 변경되면 app_name에서 YUDORI-MARIADB는 제외 되고 YADORI-MARIADB 남아 있어야 해.
//   + 이런 중첩 구조가 Tag개수만큼 모두 이루어져 있음

//
