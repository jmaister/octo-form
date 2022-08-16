import './App.css'
import FutureForm, { FutureFormType } from './FutureForm'
import FutureForm2 from './FutureForm2';

import * as yup from "yup";
import { SampleForm } from './SampleForm';
import { Container } from '@mui/material';

function App() {


  const defaultValues: FutureFormType = {
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
      {/* <FutureForm defaultValues={defaultValues} /> */}
      <SampleForm defaultValues={defaultValues} />

    </Container>
  )
}

export default App
