import "./App.css";
import { useState } from "react";
import { Button, Container, Divider } from "@mui/material";
import QueryBox from "./components/QueryBox";
import uuid from "react-uuid";
import Client from "./class/influxdb/influxdb";

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

    const fetch = async () => {
      var query = ''
      for (let i = 0; i < inputQueryBoxes.length; i++) {
        query+= client.makeQuery("query_".concat(i), inputQueryBoxes[i].get("query"))
      }
    
      const response = await client.getMetricData(query)
      setMetricDatas(response)
      console.log(response)
    }
    fetch();
  };

  const [metricDatas, setMetricDatas] = useState([]) 

  return (
    <Container>
      <h2>Metric Viewer</h2>
      <Divider />
      
      <form onSubmit={handleOnSubmit}>

          {inputQueryBoxes.map((inputQueryBox, index) => (
            <div key={inputQueryBox.get("id")} id={inputQueryBox.get("id")} style={{ display: "flex", padding: 0 }}>
              <QueryBox
                id={inputQueryBox.get("id")}
                client={client}
                onQueryBoxChange={handleOnQueryBoxChange}
                queryIndex={index} 
                removeOnClick={removeOnClick}/>

             
            </div>
          ))}
   

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
      <div>
            {metricDatas && metricDatas.map((data, index) => (
                <div key={index}>{data._time} {data.namespace} {data._value}</div>
            ))}
      </div>
     
    </Container>
  );
}

export default App;
