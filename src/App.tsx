import './App.css'

import { SampleForm, SampleFormType } from './SampleForm';
import { Container } from '@mui/material';

function App() {


  const defaultValues: SampleFormType = {
    age: 1,
    iceCreamType: "",
    todaysDate: new Date(),
    volume: 3,
    days: [],
    todaysDateAndTime: new Date(),
    example: "",
    exampleRequired: "",
  };



  return (
    <Container className="App">
      <h1>Future Form</h1>

      <SampleForm defaultValues={defaultValues} />

    </Container>
  )
}

export default App
