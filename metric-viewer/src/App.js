import './App.css';
import { useState } from 'react';
import { Box, Button, Container, Divider } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove'
import QueryBox from './components/QueryBox';


function App() {
  // newBox로 전달될 데이터를 잘 정리해야함
  const [inputQueryBoxes, setInputQueryBoxes] = useState([
    new Map(),
  ])

  const appendOnClick = () => {
    setInputQueryBoxes([...inputQueryBoxes, new Map()])
  }

  const removeOnClick = (index) => {
    if (inputQueryBoxes.length !== 1) {
      const values = [...inputQueryBoxes]
      values.splice(index, 1)
      setInputQueryBoxes(values)
    }
  }

  const handleOnSubmit = (event) => {
    event.preventDefault()
    console.log("listen name", event.target.name)
    console.log("inputQueryBoxes", inputQueryBoxes)
  }

  return (
    <Container>
      <h1>Metric Viewer</h1>
      <form onSubmit={handleOnSubmit}>
        <Box sx={{ m: 1, maxHeight: 120, minWidth: 120, flexWrap: 'wrap', overflow: 'auto' }}>
          {inputQueryBoxes.map((inputQueryBox, index) => (
            <div key={index}>
              <QueryBox inputQueryBox={inputQueryBox} index={index}>
                <IconButton onClick={() => removeOnClick(index)}> <RemoveIcon /> </IconButton>
              </QueryBox>
            </div>
          ))}
        </Box>

        <Divider />

        <div style={{ display: 'flex', padding: 15 }}>
          <div style={{ flexGrow: 1 }}>
            <Button onClick={() => appendOnClick()}>Append</Button>
          </div>
          <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'right' }}>
            <Button name='run' onClick={handleOnSubmit}>Run</Button>
            <Button name='query' onClick={handleOnSubmit}>Query</Button>
          </div>
        </div>
      </form>
      <Divider />
      <h2> Chart Viewer</h2>
    </Container>
  );
}

export default App;
