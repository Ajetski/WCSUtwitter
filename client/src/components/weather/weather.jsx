import React, { Component } from 'react';
import { Card } from 'antd';
import moment from 'moment';
import './weather.less';

const API_KEY = "f51df07cd83f76327f60ef3b0fa00c0b";

export default class Weather extends Component {
  state = {
    lat: undefined,
    lon: undefined,  
    city: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    icon: undefined,
    sunrise: undefined,
    sunset: undefined,
    errorMessage: undefined,
  }

  getPosition = () => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });    
  }
  
  getWeather = async (latitude, longitude) => { 
    const api_call = await fetch(`//api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    this.setState({
      lat: latitude,
      lon: longitude,
      city: data.name,
      temperatureC: Math.round(data.main.temp),
      temperatureF: Math.round(data.main.temp * 1.8 + 32),
      icon: data.weather[0].icon,
      sunrise: moment.unix(data.sys.sunrise).format("hh:mm a"),
      sunset: moment.unix(data.sys.sunset).format("hh:mm a"),
    })
  }

  componentDidMount() {
    this.getPosition()
    .then((position) => {      
      this.getWeather(position.coords.latitude, position.coords.longitude)
    })
    .catch((err) => {
      this.setState({ errorMessage: err.message });
    });

    this.timerID = setInterval(        
      () => 
      this.getWeather(this.state.lat, this.state.lon),
      60000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {    
    const { city, temperatureC, temperatureF, icon, sunrise, sunset} = this.state;
    if (city) {
      return (
        <Card title={city} style={{ textAlign: 'center' }}>
          <div className="weather-box">     
            <div className="weather-item-temperature">{temperatureC} &deg;C <span className="slash">/</span> {temperatureF} &deg;F</div>    
            <div>
              <img className="weather-icon" src={`http://openweathermap.org/img/w/${icon}.png`} alt="weather icon"/>
            </div>
            <div className="weather-item-sunrise">
              <span>sunrise: {sunrise}</span>
            </div>
            <div className="weather-item-sunset">
              <span>sunset: {sunset}</span>
            </div>
          </div>
        </Card> 
      );      
    }
    else {
      return (
        <div>Loading...</div>
      )
    }    
  }
}