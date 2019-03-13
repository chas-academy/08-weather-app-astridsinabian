import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';

class Top extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <Jumbotron style={{marginBottom: '0'}}>
        <h1 className="display-5 text-info">Väderprognos</h1>
        <p className="lead">Här kan du se temperatur och andra väderförhållanden för din nuvarande position</p>
      </Jumbotron>
            </div>
         );
    }
}
 
export default Top;