import './App.css'
import FutureForm, { FutureFormType } from './FutureForm'

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
    <div className="App">
      <h1>Future Form</h1>
      <FutureForm
        defaultValues={defaultValues}
        />
    </div>
  )
}

export default App
