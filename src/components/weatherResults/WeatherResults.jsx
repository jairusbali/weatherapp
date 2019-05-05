import React from "react";
import ResultsStyle from "./ResultsStyle.module.css";
import WeatherResultsCard from "./WeatherResultsCard";
const weatherResults = props => {
  return (
    <div className={ResultsStyle.WeatherResults} onClick={props.toggleUnits}>
      <WeatherResultsCard
        description={props.description}
        city={props.city}
        units={props.units}
        degrees={props.degrees}
        icon={props.icon}
      />
    </div>
  );
};

export default weatherResults;
