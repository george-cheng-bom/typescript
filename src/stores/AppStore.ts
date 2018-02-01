import { action, observable } from 'mobx';

// import { WeatherResponse }  from '../WeatherResponse';

const API_KEY = '8e5f0ddb3996f714c926941ffc709756';
const API_URL = 'https://api.openweathermap.org/data/2.5/';

type Position = {
  latitude: number;
  longitude: number;
};

export default class AppStore {

  @observable position: Position;
  @observable weather = {};

  @action async getPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.position = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        
        this.getWeather();
      });
    }
  }

  @action async getWeather() {    
    const latitude = this.position.latitude;
    const longitude = this.position.longitude;
    
    const response = await fetch(`${API_URL}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${API_KEY}`);
    this.weather = await response.json();
  }
}