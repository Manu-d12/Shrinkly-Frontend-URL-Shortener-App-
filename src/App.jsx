import { BrowserRouter, Route, Routes} from 'react-router-dom';
import {getApps} from '../src/utils/helper';

 const App = () => {

  const CurrentApp = getApps();

  return (
   <>
      <BrowserRouter>
          <CurrentApp/>
      </BrowserRouter>
    </>
  )
}


export default App;

