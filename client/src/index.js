import React, { Component } from "react";
import ReactDOM from 'react-dom';

import './index.css';
import City from './city';


class WeatherProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            scale: '°C',
        };
    }

    componentWillMount() {
        this.refresh();
    }

    refresh = () => {
        fetch('/measurements')
            .then(res => res.json())
            .then(cities => this.setState({ cities }))
            .catch(error => console.error(error));
    };

    render() {
        const { scale } = this.state;

        return (
            <div>
                <div className="header">
                    Weather Tracker
                </div>
                <div className="page">
                    {this.state.cities.map(city => {
                        return (
                            <City
                                city={city}
                                scale={scale}
                                refresh={this.refresh}
                                key={city.id}
                            />
                        )
                    }
                )}
                </div>
            </div>
        );
    }
}

ReactDOM.render(
<WeatherProject />,
    document.getElementById('root')
);