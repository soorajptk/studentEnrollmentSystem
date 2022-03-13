import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AppProvider} from './context'

import {BrowserRouter ,Routes,Route} from 'react-router-dom'


ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
    <BrowserRouter>
    <Routes>
    <Route path='/*' element={<App />}/>
    </Routes>
    </BrowserRouter>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

