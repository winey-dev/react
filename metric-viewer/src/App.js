import "./App.css";
import {useState } from "react";
import { Box, Button, Container, Divider } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import QueryBox from "./components/QueryBox";
import uuid from "react-uuid";
import Client from "./class/influxdb/influxdb";
import QueryBuilder from "./class/influxdb/querybuilder";

function App() {
  const [inputQueryBoxes, setInputQueryBoxes] = useState([
    new Map().set("id", uuid()),
    // .set("category", "resource")
    // .set("subCategory", "node"),
  ]);


  const client = new Client();

  const appendOnClick = () => {
    setInputQueryBoxes([
      ...inputQueryBoxes,
      new Map().set("id", uuid()),
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

  const handleOnQueryBoxChange = (options, index) => {
    const changeBoxes = [...inputQueryBoxes];
    changeBoxes[index].set("query", options) 
    setInputQueryBoxes(changeBoxes);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
   
    const fetch = async() => {
      for (let i = 0 ; i < inputQueryBoxes.length; i++) {
        const query = client.makeQuery("query_".concat(i), inputQueryBoxes[i].get("query"))
      
       
        console.log(query)
   
      }
    }
    fetch();
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
            <div key={inputQueryBox.get("id")} id={inputQueryBox.get("id")} style={{ display: "flex", padding: 0 }}>
              <QueryBox 
                id={inputQueryBox.get("id")} 
                client={client} 
                onQueryBoxChange={handleOnQueryBoxChange} 
                queryIndex={index} />
             
                <IconButton id={inputQueryBox.get("id")} onClick={() => removeOnClick(index)}>
                  <RemoveIcon />
                </IconButton>
              
            </div>
          ))}
        </Box>   

        <Divider />
        <div style={{ display: "flex", padding: 15 }}>
          <div style={{ flexGrow: 1 }}>
            <Button onClick={() => appendOnClick()}>Append</Button>
          </div>
          <div style={{ flexGrow: 1, display: "flex", justifyContent: "right" }}>
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
