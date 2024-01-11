/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react';
import {View, Text, PermissionsAndroid, TouchableHighlight} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import WeatherWidgetStyles from './weather.widget.styles';


const wmoCode = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog and depositing rime fog',
    48: 'Fog and depositing rime fog',
    51: 'Drizzle: Light intensity',
    53: 'Drizzle: Moderate intensity',
    55: 'Drizzle: Dense intensity',
    56: 'Freezing Drizzle: Light intensity',
    57: 'Freezing Drizzle: Dense intensity',
    61: 'Rain: Slight intensity',
    63: 'Rain: Moderate intensity',
    65: 'Rain: Heavy intensity',
    66: 'Freezing Rain: Light intensity',
    67: 'Freezing Rain: Heavy intensity',
    71: 'Snow fall: Slight intensity',
    73: 'Snow fall: Moderate intensity',
    75: 'Snow fall: Heavy intensity',
    77: 'Snow grains',
    80: 'Rain showers: Slight intensity',
    81: 'Rain showers: Moderate intensity',
    82: 'Rain showers: Violent intensity',
    85: 'Snow showers: Slight intensity',
    86: 'Snow showers: Heavy intensity',
    95: 'Thunderstorm: Slight',
    96: 'Thunderstorm with hail: Slight',
    99: 'Thunderstorm with hail: Heavy',
    100: 'Permission Required',
};

const WeatherWidget = () => {
    const [location, setLocation] = useState({'latitude': 20.23, 'longitude': -180.90});
    const [weather, setWeather] = useState({'current':{'temperature_2m': 'Location', 'weather_code': 100}, 'current_units':{'temperature_2m': ' '}});
    const [timeNow, setTimeNow] = useState('');

    const requestLocationPermission = async () => {
        try {
        const granted = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted) {
            //console.log('You can use Geolocation');
            return true;
        } else {
            const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Geolocation Access',
                message: 'LunaSyz requires location access to display current weather and temprature.',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
            );
            if (result === PermissionsAndroid.RESULTS.GRANTED) {
            //console.log('You can use Geolocation');
            return true;
            } else {
            //console.log('You cannot use Geolocation');
            return false;
            }
        }
        } catch (err) {
        console.error(err);
        return false;
        }
    };

    const getLocation = () => {
        const result = requestLocationPermission();
        result.then(res => {
            //console.log('res is:', res);
            if (res) {
            Geolocation.getCurrentPosition(
                position => {
                //console.log(position.toString(), `${position.coords.latitude.toString()}, ${ position.coords.longitude.toString()}`);
                setLocation(position.coords);
                getWeatherData(position.coords);
                },
                error => {
                // See error code charts below.
                console.log(error.code.toString(), error.message);
                },
                {enableHighAccuracy: true, timeout: 1500, maximumAge: 10000},
            );
            }
        });
    };

    const getWeatherData = async (gps: any) =>{
        const URL = `https://api.open-meteo.com/v1/forecast?latitude=${gps.latitude.toString()}&longitude=${gps.longitude.toString()}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,wind_speed_10m,wind_direction_10m,weather_code`;
        let headersList = {
            'Accept': '*/*',
            'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
            };

            let response = await fetch(URL, {
            method: 'GET',
            headers: headersList,
        });

        let data = await response.json();
        setWeather(data);
    };

    const getTimeValue = () => {
        setInterval(()=>{
            let now = new Date();
            let hrs = now.getHours();
            let min = now.getMinutes();
            let val = hrs.toString() + ':' + min.toString();
            setTimeNow(val);
        }, 1000);
    };


    const getDateValue = () => {
        let today = new Date();
        /*
        let month = months[today.getMonth()];
        let date = today.getDate();
        let year = today.getFullYear();
        const val = month + ' ' + date + ', ' + year;
        */
        return today.toDateString();
    };

    useEffect(()=>{
        getLocation();
        getTimeValue();
    }, []);

  return (
    <View>
        <View style={WeatherWidgetStyles.weatherData}>
        <View style={WeatherWidgetStyles.dateData}>
            <Text style={WeatherWidgetStyles.dayValue}>{timeNow}</Text>
            <Text style={WeatherWidgetStyles.dateValue}>{getDateValue()}</Text>
        </View>
        <TouchableHighlight onPress={getLocation}>
        <View style={WeatherWidgetStyles.tempData}>
            <Text style={WeatherWidgetStyles.tempValue}>{weather.current.temperature_2m.toString()} {weather.current_units.temperature_2m.toString()}</Text>
            <Text style={WeatherWidgetStyles.weatherType}>{wmoCode[weather.current.weather_code]}</Text>
        </View>
        </TouchableHighlight>
        </View>
    </View>
  );
};

export default WeatherWidget;
