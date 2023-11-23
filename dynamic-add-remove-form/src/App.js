import { useState } from 'react';
import './App.css';
import { Container } from '@mui/material';
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles'
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
const useStyles = makeStyles((thema) => ({
  root: {
    '& .MuiTextField-root': {
      margin: 10,
    }
  }
}))




function App() {
  const classes = useStyles();
  const [inputFields, setInputFields] = useState([
    { firstName: '', lastName: '' },
   
  ])

  const handleChangeInput = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("InputFields", inputFields)
  }

  const createHandle = () => {
    setInputFields([...inputFields, { firstName: '', lastName: '' }])
  }

  const removeHandle = (index) => {
    const values = [...inputFields];
    values.splice(index, 1)
    setInputFields(values)
  }

  const Form = (props) => {
    const {removeHandler, inputField, index} = props
  
    return (
      <>
      <TextField
      name='firstName'
      label='First Name'
      value={inputField.firstName}
      onChange={event => handleChangeInput(index, event)}
    />
  
    <TextField
      name='lastName'
      label='Last Name'
      value={inputField.lastName}
      onChange={event => handleChangeInput(index, event)}
    />
    
    <IconButton
      onClick={() => removeHandler(index)}>
      <RemoveIcon />
    </IconButton>
    </>
    )
  }
  
  return (
    <Container>
      <h1>Dynamic Add Remove Form</h1>
      <form className={classes.root} onSubmit={handleSubmit}>
        {inputFields.map((inputField, index) => (
          <div key={index}>
            <Form removeHandler={removeHandle} inputField={inputField} index={index}/>
            {/* <TextField
              name='firstName'
              label='First Name'
              value={inputField.firstName}
              onChange={event => handleChangeInput(index, event)}
            />

            <TextField
              name='lastName'
              label='Last Name'
              value={inputField.lastName}
              onChange={event => handleChangeInput(index, event)}
            />
            
            <IconButton
              onClick={() => removeHandle(index)}>
              <RemoveIcon />
            </IconButton> */}
          </div>
        ))}
         <IconButton
              onClick={() => createHandle()}
            >
              <AddIcon />
            </IconButton>
        <Button
          variant='contained'
          type='submit'
          color='primary'
          onClick={handleSubmit}
        >Send</Button>
      </form>
    </Container>
  );
}

// function App() {
//   const classes = useStyles();
//   const [inputFields, setInputFields] = useState([
//     { firstName: '', lastName: '' },
   
//   ])

//   const handleChangeInput = (index, event) => {
//     const values = [...inputFields];
//     values[index][event.target.name] = event.target.value;
//     setInputFields(values);
//   }


//   const handleSubmit = (e) => {
//     e.preventDefault()
//     console.log("InputFields", inputFields)
//   }



//   const createHandle = () => {
//     setInputFields([...inputFields, { firstName: '', lastName: '' }])
//   }

//   const removeHandle = (index) => {
//     const values = [...inputFields];
//     values.splice(index, 1)
//     setInputFields(values)
//   }
//   return (
//     <Container>
//       <h1>Dynamic UseForm</h1>
//       <form className={classes.root} onSubmit={handleSubmit}>
//         {inputFields.map((inputField, index) => (
//           <div key={index}>
//             <TextField
//               name='firstName'
//               label='First Name'
//               value={inputField.firstName}
//               onChange={event => handleChangeInput(index, event)}
//             />

//             <TextField
//               name='lastName'
//               label='Last Name'
//               value={inputField.lastName}
//               onChange={event => handleChangeInput(index, event)}
//             />
            
//             <IconButton
//               onClick={() => removeHandle(index)}>
//               <RemoveIcon />
//             </IconButton>
//             <IconButton
//               onClick={() => createHandle()}
//             >
//               <AddIcon />
//             </IconButton>
//           </div>
//         ))}
//         <Button
//           variant='contained'
//           type='submit'
//           color='primary'
//           onClick={handleSubmit}
//         >Send</Button>
//       </form>
//     </Container>
//   );
// }

export default App;
