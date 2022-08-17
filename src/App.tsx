import './App.css'

import Container from '@mui/material/Container';
import { IceCreamForm, IceCreamType } from './IceCreamForm';
import { SampleForm, SampleFormType } from './SampleForm';

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
}


  const defaultIceCreamValues: IceCreamType = {
    name: "",
    birthday: new Date(),
    rating: 0,
    iceCreamType: "",
  };

  return (
    <Container className="App">
      <h1>MuyForm</h1>

      <SampleForm defaultValues={defaultValues}/>

      <h2>IceCream Form</h2>

      <IceCreamForm defaultValues={defaultIceCreamValues} />

    </Container>
  )
}

export default App
