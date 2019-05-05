import React, { Component } from "react";

import "./App.css";

import "typeface-roboto";

import axios from "axios";
import UserInput from "../components/userInput/UserInputs";

import WeatherResults from "../components/weatherResults/WeatherResults";
import FormControl from "@material-ui/core/FormControl";

import CustomizedSnackbars from "../components/Snackbars/snackBarWarning";

const API_KEY = "&APPID=" + process.env.REACT_APP_WEATHER_API_KEY;
axios.defaults.baseURL = "http://api.openweathermap.org/data/2.5";
const weatherIconBaseURL = "http://openweathermap.org/img/w/";
const CELCIUS = "Celcius";
const FARENHEIT = "Farenheit";
const WARNING = "warning";
const WARNING_MESSAGE = "Invalid entry";

class App extends Component {
  state = {
    weatherData: null,
    search: "",
    units: FARENHEIT,
    errorEncountered: false,
    searchClicked: false
  };

  componentDidMount() {
    this.setState({ errorEncountered: false });
  }

  // resets the state when user types
  // inside the input
  onChangeInputHandler = event => {
    this.setState({
      search: event.target.value,
      errorEncountered: false,
      searchClicked: false
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.searchClicked !== nextState.searchClicked ||
      this.state.weatherData !== nextState.weatherData ||
      this.state.errorEncountered !== nextState.errorEncountered ||
      this.state.units !== nextState.units
    );
  }

  // fetch weather data from OpenWeatherMap API
  // for the entered city in the search textbox
  search = input => {
    axios
      .get("weather?q=" + this.state.search + API_KEY)
      .then(response => {
        this.setState({ weatherData: response.data }, () => {
          this.setState({ errorEncountered: false });
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ errorEncountered: true });
      });

    this.setState({ searchClicked: true });
  };

  convertKelvinToCelsius = kelvin => {
    if (kelvin < 0) {
      return "below absolute zero (0 K)";
    } else {
      return Math.round(kelvin - 273.15);
    }
  };

  convertKelvinToFarenheit = kelvin => {
    const celsius = kelvin - 273;
    return Math.floor(celsius * (9 / 5) + 32);
  };

  toggleUnits = () => {
    if (this.state.units === FARENHEIT) {
      this.setState({ units: CELCIUS });
    } else {
      this.setState({ units: FARENHEIT });
    }
  };

  render() {
    let results = null;

    if (this.state.weatherData && this.state.searchClicked) {
      let { name, weather, main } = this.state.weatherData;

      results = (
        <WeatherResults
          icon={weatherIconBaseURL + weather[0].icon + ".png"}
          description={weather[0].description}
          city={name}
          degrees={
            this.state.units === CELCIUS
              ? this.convertKelvinToFarenheit(main.temp)
              : this.convertKelvinToCelsius(main.temp)
          }
          units={this.state.units === CELCIUS ? FARENHEIT : CELCIUS}
          toggleUnits={this.toggleUnits}
        />
      );
    }

    if (this.state.errorEncountered && this.state.searchClicked) {
      console.log("error!");
      results = (
        <CustomizedSnackbars
          isOpen={true}
          message={WARNING_MESSAGE}
          variant={WARNING}
        />
      );
    }

    return (
      <div className="outer">
        <h1>Weather API</h1>
        <h4>
          Simple weather application using the OpenWeatherMap API to view the
          current weather in the searched city.
        </h4>
        <FormControl className="App">
          <UserInput
            onChangeInputHandler={this.onChangeInputHandler}
            search={() => this.search(this.state.search)}
            toggleUnits={this.toggleUnits}
            units={this.state.units}
          />
          {results}
        </FormControl>
      </div>
    );
  }
}

export default App;
