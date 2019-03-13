import React, { Component } from 'react';


const API_KEY = '8b423980340f4f09303c5e42223db539';

class Weather extends Component {

    constructor() {
      super();
      this.state = {
        weather: [],
        currently: [],
        hourly: [],
        daily: [],
        isLoading: false,
        error: null
      }
    }
    
    componentDidMount() {
       this.fetchData();
    }

    fetchData() {
        this.setState({
            isLoading: true,
        });

        fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${API_KEY}/42.3601,-71.0589`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong ...');
            }
        })
        .then(data => this.setState({ weather: data,
            currently: data['currently'],
            hourly: data['hourly']['data'],
            daily: data['daily']['data'], isLoading: false}))
        .catch(error => console.log("Parsing failed", error))

};

    render() { 
        const { weather, isLoading, error } = this.state;

        if (error) {
            return <p>{error.message}</p>;
        }

        if (isLoading) {
            return <p>Loading...</p>;
        }

        return ( 
            <div>
                <h3>Weather Component</h3>
                
                   
                    <h5> { weather.timezone } </h5>
                   
               
            </div>
         );
    }
}
 
export default Weather;