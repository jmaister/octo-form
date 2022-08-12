import { useState } from 'react'
import './App.css'
import FutureForm from './FutureForm'

import * as yup from 'yup';
import { InputType } from './Types';

function App() {

  
  const defaultValues: InputType = {
    age: 1,
    iceCreamType: "",
    todaysDate: new Date(),
    volume: 3,
    days: [],
    todaysDateAndTime: new Date(),
    example: "",
    exampleRequired: "",
}

// https://github.com/jquense/yup#typescript-integration
const schema : yup.SchemaOf<InputType> = yup.object({
  example: yup.string(),
  exampleRequired: yup.string().required(),
  iceCreamType: yup.string().oneOf(iceCreamOptions.filter(o => o.label != "").map(option => option.value.toString())),
  age: yup.number().positive().integer().moreThan(0).required(),
  todaysDate: yup.date().required(),
  todaysDateAndTime: yup.date().required(),
  days: yup.array().of(yup.string().oneOf(dayOptions.filter(o => o.label != "").map(option => option.value.toString()))).required(),
  volume: yup.number().positive().integer().min(0).max(10).required(),
}).required();


  return (
    <div className="App">
      <h1>Future Form</h1>
      <FutureForm
        defaultValues={defaultValues}
        schema={schema} />
    </div>
  )
}

export default App
