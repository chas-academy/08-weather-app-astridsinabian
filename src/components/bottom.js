import React, { Component } from 'react';

const footerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e9ecef',
    padding: '30px',
    color: 'gray'
}


class Bottom extends Component {
    state = {  }
    render() { 
        return ( 
            <footer style={footerStyle}>
                <div>
                    Väderapp skapad av <a style={{color: '#17a2b8', textDecoration: 'none'}} href="https://astridsinabian.se">Astrid Sinabian</a> och 
                    <a style={{color: '#17a2b8', textDecoration: 'none'}} href="https://darksky.net/poweredby/"> Powered by Dark Sky</a>
                </div>
            </footer>
         );
    }
}
 
export default Bottom;