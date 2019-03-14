import React, { Component } from 'react';

import Top from './components/top.js';
import Weather from './components/weather.js';
import Bottom from './components/bottom';

class App extends Component {

 
  render() { 
    return ( 
        <div>
          <Top />
          <Weather />
          <Bottom />
        </div>
     );
  }
}
 
export default App;