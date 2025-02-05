import './App.css';
import { useState } from 'react';

import Bulb from'./components/Bulb';
import Counter from'./components/Counter';

const App = () => {
  return (
    <>
      <Bulb />
      <Counter />
    </>
  )
}

export default App
