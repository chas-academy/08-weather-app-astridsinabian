import React, { Component } from 'react';

import Top from './components/top.js';
import Form from './components/form.js';
import Weather from './components/weather.js';


class App extends Component {

 
  render() { 
    return ( 
        <div>
          <Top />
          <Form />
          <Weather />
        </div>
     );
  }
}
 
export default App;