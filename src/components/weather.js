import React, { Component } from 'react';


const API_KEY = '8b423980340f4f09303c5e42223db539';

class Weather extends Component {

    constructor(props) {
      super(props);
      this.state = {
        data: [],
        isLoading: false,
        error: null
      }
    }
    
    componentDidMount() {
       this.fetchData();
    }

    fetchData() {
        this.setState({isLoading: true});

        fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${API_KEY}/42.3601,-71.0589`)
        .then(response => response.json())
        .then(parsedJSON => console.log(parsedJSON))

}

    render() { 
        const { isLoading, error } = this.state;

        if (error) {
            return <p>{error.message}</p>;
        }

        if (isLoading) {
            return <p>Loading...</p>;
        }

        return ( 
            <div>
                <h3>Weather Component</h3>
            </div>
         );
    }
}
 
export default Weather;