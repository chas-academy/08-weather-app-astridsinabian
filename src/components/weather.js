import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Card, CardText, CardDeck, CardBody, CardHeader } from 'reactstrap';
import { Spinner } from 'reactstrap';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

const API_KEY = '8b423980340f4f09303c5e42223db539';
const Timestamp = require('react-timestamp');

class Weather extends Component {

    constructor() {
      super();
      this.state = {
        weather: [],
        currently: [],
        hourly: [],
        daily: [],
        isLoading: false,
        error: null,
        activeTab: '1'
      }

      this.toggle = this.toggle.bind(this);

    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
    }
    
    componentDidMount() {
       this.fetchData();
    }

    fetchData() {
        navigator.geolocation.getCurrentPosition((position) => {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
        
        this.setState({
            isLoading: true,
        });

        fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${API_KEY}/${latitude},${longitude}?lang=sv`)
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

        })
    }

    render() { 
        const { weather, currently, daily, hourly, isLoading, error } = this.state;

        if (error) {
            return <p>{error.message}</p>;
        }

        if (isLoading) {
            return <Spinner type="grow" color="info" />;
        }

        return ( 
            <div>
                 <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Just nu
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Veckan
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              5 dagar
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggle('4'); }}
            >
              3e timme
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            
              <ListGroup style={{margin: '30px'}}>
                    <ListGroupItem >
                        <ListGroupItemHeading className="text-info" style={{paddingBottom: '15px'}}>Prognos för { weather.timezone }</ListGroupItemHeading>
                        <ListGroupItemText><i>{ currently.summary }</i></ListGroupItemText>
                        <ListGroupItemText>Temperatur: { Math.round((currently.temperature - 32) * 5/9) } °C / { Math.round(currently.temperature) } °F </ListGroupItemText>
                        <ListGroupItemText>Luftfuktighet: { currently.humidity * 100 } %</ListGroupItemText>
                        <ListGroupItemText>Vindstyrka: { currently.windSpeed } m/s </ListGroupItemText>
                    </ListGroupItem>
                </ListGroup>
          </TabPane>
          <TabPane tabId="2">
          <h4 style={{margin: '30px', textAlign: 'center'}} className="text-info">Prognos för en vecka</h4>
            <ListGroup>
                { daily.map(day => 
                <ListGroupItem> 
                  Temperatur: { Math.round((day.temperatureHigh - 32) * 5/9) } °C / { Math.round(day.temperatureHigh) } °F
                  Vindstyrka: { day.windSpeed } m/s
                  Luftfuktighet: { day.humidity * 100 } %
                  Soluppgång: <Timestamp time={ day.sunriseTime } format='full' />
                  Solnedgång: <Timestamp time={ day.sunsetTime } format='full' />
                </ListGroupItem> 
                )}
            </ListGroup>
          </TabPane>
          <TabPane tabId="3">
          <h4 style={{margin: '30px', textAlign: 'center'}} className="text-info">Prognos för 5 dagar</h4>
    
    <CardDeck style={{margin: '30px'}}>
    { daily.map( day => 
    <Card>  
        <CardHeader className="text-info"><Timestamp time={ day.time } format='full' /></CardHeader>
        <CardBody>
          <CardText>
              Temperatur: { Math.round((day.temperatureHigh - 32) * 5/9) } °C / { Math.round(day.temperatureHigh) } °F
              Vindstyrka: { day.windSpeed } m/s
              Luftfuktighet: { day.humidity * 100 } %
              Soluppgång: <Timestamp time={ day.sunriseTime } format='time' />
              Solnedgång: <Timestamp time={ day.sunsetTime } format='time' />
          </CardText>
        </CardBody>
      </Card>
       ).slice(0, 5)}
    </CardDeck>
          </TabPane>

          <TabPane tabId="4">
          <h4 style={{margin: '30px', textAlign: 'center'}} className="text-info">Prognos för 3 timmar för nuvarande dygn</h4>
          
            <Table responsive>
        <thead>
          <tr>
            <th className="text-info">Timme</th>
            <th className="text-info">Temperatur</th>
            <th className="text-info">Vindstyrka</th>
            <th className="text-info">Luftfuktighet</th>
          </tr>
        </thead>
        { hourly.map( hour => 
        <tbody>
          <tr>
            <th scope="row"><Timestamp time={ hour.time } format='time' /></th>
            <td>{ Math.round((hour.temperature - 32) * 5/9) } °C / { Math.round(hour.temperature) } °F </td>
            <td>{ hour.windSpeed } m/s</td>
            <td>{ hour.humidity * 100 } %</td>
          </tr>
        </tbody>
           ).slice(0, 3)}
      </Table>
          </TabPane>
        </TabContent>

            </div>
         );
    }

  

}
 
export default Weather;