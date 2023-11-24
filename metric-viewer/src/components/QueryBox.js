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
