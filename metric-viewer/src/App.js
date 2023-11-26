import "./App.css";
import { useEffect, useState } from "react";
import { Box, Button, Container, Divider } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import QueryBox from "./components/QueryBox";
import Schema from "./class/influxdb/mock/schema";
import uuid from "react-uuid";

function App() {
  const [inputQueryBoxes, setInputQueryBoxes] = useState([
    new Map()
      .set("id", uuid())
      // .set("category", "resource")
      // .set("subCategory", "node"),
  ]);

  const schema = new Schema();

  const appendOnClick = () => {
    setInputQueryBoxes([
      ...inputQueryBoxes,
      new Map()
        .set("id", uuid())
        // .set("category", "resource")
        // .set("subCategory", "node"),
    ]);
  };

  const removeOnClick = (index) => {
    if (inputQueryBoxes.length !== 1) {
      const values = [...inputQueryBoxes];
      values.splice(index, 1);
      setInputQueryBoxes(values);
    }
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log("input query boxes", inputQueryBoxes);
  };

  const handleOnQueryBoxChange = (type, index, key, value) => {
    const changeBoxes = [...inputQueryBoxes];
    if (type === "ADD" || type === "UPDATE") {
      changeBoxes[index].set(key, value);
    } else if (type === "DELETE") {
      changeBoxes[index].delete(key);
    } else if (type === "CLEAR") {
      changeBoxes[index].clear();
    } else {
      console.log("not support type: ", type);
      return;
    }
    setInputQueryBoxes(changeBoxes);
  };

  return (
    <Container>
      <h2>Metric Viewer</h2>
      <form onSubmit={handleOnSubmit}>
        <Box
          sx={{
            m: 1,
            minWidth: 120,
          }}
          // Query Box에 스크롤을 적용하여 특정 라인을 넘어가지 않도록 설정 하는 sx
          // sx={{
          //   m: 1,
          //   maxHeight: 120,
          //   minWidth: 120,
          //   flexWrap: "wrap",
          //   overflow: "auto",
          // }}
        >
          {inputQueryBoxes.map((inputQueryBox, index) => (
            <div
              key={index}
              id={inputQueryBox.get("id")}
              style={{ display: "flex", padding: 0 }}
            >
              <QueryBox
                id={inputQueryBox.get("id")}
                client={schema}
                onQueryBoxChange={handleOnQueryBoxChange}
                boxIndex={index}
              />
              {index !== 0 && (
                <IconButton
                id={inputQueryBox.get("id")}
                onClick={() => removeOnClick(index)}
              >
                <RemoveIcon />
              </IconButton>
              )}
            </div>
          ))}
        </Box>

        <Divider />
        <div style={{ display: "flex", padding: 15 }}>
          <div style={{ flexGrow: 1 }}>
            <Button onClick={() => appendOnClick()}>Append</Button>
          </div>
          <div
            style={{ flexGrow: 1, display: "flex", justifyContent: "right" }}
          >
            <Button name="run" onClick={handleOnSubmit}>
              Run
            </Button>
            <Button name="query" onClick={handleOnSubmit}>
              Query
            </Button>
          </div>
        </div>
      </form>
      {/* {queryList &&
        queryList.map((query, index) => (
          <div>
            <Divider> query_{index} </Divider>
            {query}
          </div>
        ))} */}
    </Container>
  );
}

export default App;
