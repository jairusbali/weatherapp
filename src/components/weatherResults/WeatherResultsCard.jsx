import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
};

const farenheit = <span>&deg;F</span>;
const celcius = <span>&deg;C</span>;

function WeatherResultsCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          style={{
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",

            height: "100px"
          }}
          className={classes.media}
          image={props.icon}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.city} <br />
            {props.degrees}
            {props.units === "Celcius" ? celcius : farenheit}
          </Typography>
          <Typography component="p">{props.description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default withStyles(styles)(WeatherResultsCard);
