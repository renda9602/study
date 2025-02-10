import { useState } from 'react'
import Editer from './Components/Editor'
import Header from './Components/Header'
import List from './Components/List'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Editer />
      <List />
    </>
  )
}

export default App
