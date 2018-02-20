import React, { Component } from "react";
import moment from 'moment';

import './city.css';
import { sendPost } from "./api";

export default class City extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newTemp  : null,
        }
    }

    // Parse a string to a floating point number
    handleChange = (event) => {
        this.setState({ newTemp: parseFloat(event.target.value) });
    };

    handleSubmit = (id, temperature) => {
        if (temperature === null) return;

        this.setState({ newTemp: null });
        sendPost(id, temperature)
            .then(() => this.props.refresh())
            .catch(err => console.error(err));
    };

    // Check whether the given temperature is valid, that is, the temperature is between -50 to 60 degrees and
    // that the value is given in one decimal place at the most
    isSubmittable = () => {
        const { newTemp } = this.state;
        return (
            newTemp >= -50 && newTemp <= 60 && (newTemp * 10) % 1 === 0
        );
    };

    // Return current time in appropriate format.
    formatTimeStamp = (date) => {
        return moment(date).format('MMM Do, HH:mm')
    };

    render() {
        const isEnabled = this.isSubmittable();
        const { scale, city } = this.props;
        const { newTemp} = this.state;

        return (
            <div key={city.id} className="city">
            <span className="cityName">
            {city.name}<br/>
        </span>
        <div className="tempAndDate">
            <span className="currentTemp">
            {`${city.temperature}${scale}`}<br/>
        </span>
        <span className="postedTime">
            {`Updated ${this.formatTimeStamp(city.postedTime)}`}
    </span>
        </div>
        <div className="textAndTemp">
            <span>
            {`High: ${(city.maxtemperature === null) ? '-' : city.maxtemperature}${scale}`}<br/>
        </span>
        </div>
        <div className="textAndTemp">
            <span>
            {`Low: ${(city.mintemperature === null) ? '-' : city.mintemperature}${scale}`}<br/>
        </span>
        </div>
        <div className={"input"}>
            <span className="formText">
            Submit your own measurement:<br/>
        </span>
        <label>
        <input
        type="number"
        step="0.1"
        min="-50"
        max="50"
        name="temperature"
        onChange={this.handleChange}
        className="inputCustom"
        ref={ref => this.textInput = ref}
        />
        <span className="rightMargin">°C</span>
        </label>
        <input
        value="SEND"
        className="submitButton"
        type="submit"
        disabled={!isEnabled}
        onClick={() => {this.textInput.value = ""; this.handleSubmit(city.id, newTemp)}}
        />
        </div>
        </div>
    )
    }

}



