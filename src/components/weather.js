import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Card, CardText, CardDeck, CardBody, CardHeader } from 'reactstrap';
import { Spinner } from 'reactstrap';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

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
        const { weather, currently, isLoading, error } = this.state;

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
                        <ListGroupItemText><i> { currently.summary } </i></ListGroupItemText>
                        <ListGroupItemText>Temperatur: { Math.round((currently.temperature - 32) * 5/9) } °C / { Math.round(currently.temperature) } °F </ListGroupItemText>
                        <ListGroupItemText>Luftfuktighet: { currently.humidity * 100 } %</ListGroupItemText>
                        <ListGroupItemText>Vindstyrka: { currently.windSpeed } m/s </ListGroupItemText>
                    </ListGroupItem>
                </ListGroup>
          </TabPane>
          <TabPane tabId="2">
          <h4 style={{margin: '30px', textAlign: 'center'}} className="text-info">Prognos för en vecka</h4>
            <ListGroup>
                <ListGroupItem>Cras justo odio</ListGroupItem>
                <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                <ListGroupItem>Morbi leo risus</ListGroupItem>
                <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
                <ListGroupItem>Vestibulum at eros</ListGroupItem>
            </ListGroup>
          </TabPane>
          <TabPane tabId="3">
          <h4 style={{margin: '30px', textAlign: 'center'}} className="text-info">Prognos för 5 dagar</h4>
    <CardDeck style={{margin: '30px'}}>
    <Card>
        <CardHeader className="text-info">Dag</CardHeader>
        <CardBody>
          <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
        </CardBody>
      </Card>
      <Card>
        <CardHeader className="text-info">Dag</CardHeader>
        <CardBody>
          <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
        </CardBody>
      </Card>
      <Card>
        <CardHeader className="text-info">Dag</CardHeader>
        <CardBody>
          <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
        </CardBody>
      </Card>
      <Card>
        <CardHeader className="text-info">Dag</CardHeader>
        <CardBody>
          <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
        </CardBody>
      </Card>
      <Card>
        <CardHeader className="text-info">Dag</CardHeader>
        <CardBody>
          <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
        </CardBody>
      </Card>
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
            <th className="text-info">Soluppgång</th>
            <th className="text-info">Solnedgång</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
        </tbody>
      </Table>
          </TabPane>
        </TabContent>

            </div>
         );
    }

  

}
 
export default Weather;