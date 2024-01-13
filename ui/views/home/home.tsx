/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react';
import {View, Text, PermissionsAndroid, TouchableHighlight} from 'react-native';
import SunCalc from 'suncalc';
import Slider from '@react-native-community/slider';
import Geolocation from 'react-native-geolocation-service';
import homeStyles from './home.styles';

const lunarPhaseKey = {
  'New Moon': '🌑',
  'Waxing Crescent': '🌒',
  'First Quarter': '🌓',
  'Waxing Gibbous': '🌔',
  'Full Moon': '🌕',
  'Waning Gibbous': '🌖',
  'Last Quarter': '🌗',
  'Waning Crescent': '🌘',
};

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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

const getDayValue = () => {
  let today = new Date();
  let val = today.getDay();

  return days[val];
};

/*
const getLunarPhase = () => {
  const today = new Date();
  const moonIllumination = SunCalc.getMoonIllumination(today);
  const phase = getMoonPhase(moonIllumination.phase);
  return lunarPhaseKey[phase];
};

const getLunarPhaseAngle = (gps: { latitude?: any; longitude?: any; }) => {
  const today = new Date();
  const moonIllumination = SunCalc.getMoonIllumination(today);
  const moonPosition = SunCalc.getMoonPosition(today, gps.latitude, gps.longitude);
  const angle = moonIllumination.angle - moonPosition.parallacticAngle;
  return Math.floor(angle * 100);
};

const getLunarPhaseName = () => {
  const today = new Date();
  const moonIllumination = SunCalc.getMoonIllumination(today);
  const phase = getMoonPhase(moonIllumination.phase);
  return phase;
};
*/

const getMoonPhase = (phase: number) => {
  if (phase > 0 && phase <= 0.02) {
    return 'New Moon';
  } else if (phase > 0.02 && phase <= 0.23) {
    return 'Waxing Crescent';
  } else if (phase > 0.23 && phase <= 0.26) {
    return 'First Quarter';
  } else if (phase > 0.26 && phase <= 0.48) {
    return 'Waxing Gibbous';
  } else if (phase > 0.48 && phase <= 0.51) {
    return 'Full Moon';
  } else if (phase > 0.51 && phase <= 0.73) {
    return 'Waning Gibbous';
  } else if (phase > 0.73 && phase <= 0.76) {
    return 'Last Quarter';
  } else if (phase > 0.76 && phase <= 0.97) {
    return 'Waning Crescent';
  } else if (phase > 0.97) {
    return 'Full Moon';
  }
};

const getDatesAroundToday = () => {
  const today = new Date();
  const datesAroundToday = [];

  // Get three dates before today
  for (let i = 15; i > 0; i--) {
    const dateBefore = new Date(today);
    dateBefore.setDate(today.getDate() - i);
    datesAroundToday.push(`${dateBefore.toDateString()}`);
  }

  // Get three dates after today
  for (let i = 0; i <= 15; i++) {
    const dateAfter = new Date(today);
    dateAfter.setDate(today.getDate() + i);
    datesAroundToday.push(`${dateAfter.toDateString()}`);
  }

  return datesAroundToday;
};

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

const Home = ({navigation}) => {

  const [location, setLocation] = useState({'latitude': 20.23, 'longitude': -180.90});
  const [weather, setWeather] = useState({'current':{'temperature_2m': 'Location', 'weather_code': 100}, 'current_units':{'temperature_2m': ' '}});
  const [lunarPhaseDataObject, setLunarPhaseDataObject] = useState({'phaseImg': '', 'phaseName': '', 'phaseAngle': 90, 'phaseDate': ''});
  const [timeNow, setTimeNow] = useState('');

  const getMonthlyLunarPhases = () =>{
    const monthDates = getDatesAroundToday();
    let lunarPhases = [];
    for (let i = 0; i < 31; i++){
      let date = new Date(monthDates[i]);
      let moonIllumination = SunCalc.getMoonIllumination(date);
      let phase = getMoonPhase(moonIllumination.phase);
      let month = months[date.getMonth()];
      let dateNum = date.getDate();
      let year = date.getFullYear();
      const dateVal = month + ' ' + dateNum + ', ' + year;
      const moonPosition = SunCalc.getMoonPosition(date, location.latitude, location.longitude);
      const angle = moonIllumination.angle - moonPosition.parallacticAngle;
      lunarPhases.push({'phaseImg': lunarPhaseKey[phase], 'date': dateVal, 'phaseName': phase, 'phaseAngle': angle});
    }
    return lunarPhases;
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

  const newLunarPhaseData = (index: number) =>{
    let newLunarPhaseDataObject = {
      phaseImg: getMonthlyLunarPhases()[index].phaseImg,
      phaseDate: getMonthlyLunarPhases()[index].date,
      phaseName: getMonthlyLunarPhases()[index].phaseName,
      phaseAngle: Math.abs(getMonthlyLunarPhases()[index].phaseAngle) * 100,
    };
    setLunarPhaseDataObject(newLunarPhaseDataObject);
  };


  const getTimeValue = () => {
    setInterval(()=>{
      let now = new Date;
      let hrs = now.getHours();
      let min = now.getMinutes();
      let val = hrs.toString() + ':' + min.toString();
      setTimeNow(val);
    }, 1000);
  };

  useEffect(()=>{
    getLocation();
    newLunarPhaseData(15);
    getTimeValue();
  }, []);

  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.weatherDataContainer}>
        <View style={homeStyles.weatherData}>
          <View style={homeStyles.dateData}>
            <Text style={homeStyles.dayValue}>{timeNow}</Text>
            <Text style={homeStyles.dateValue}>{getDateValue()}</Text>
          </View>
          <TouchableHighlight onPress={getLocation}>
          <View style={homeStyles.tempData}>
            <Text style={homeStyles.tempValue}>{weather.current.temperature_2m.toString()} {weather.current_units.temperature_2m.toString()}</Text>
            <Text style={homeStyles.weatherType}>{wmoCode[weather.current.weather_code]}</Text>
          </View>
          </TouchableHighlight>
        </View>
      </View>
      <View style={homeStyles.todaysMoon}>
        <TouchableHighlight style={{transform: 'rotate(' + lunarPhaseDataObject.phaseAngle + 'deg)'}}>
          <Text style={homeStyles.todaysMoonImg}>{lunarPhaseDataObject.phaseImg}</Text>
        </TouchableHighlight>
        <Text style={homeStyles.todaysMoonText}>{lunarPhaseDataObject.phaseName}</Text>
        <Text style={homeStyles.dateValue}>{lunarPhaseDataObject.phaseDate}</Text>
        <Slider value={15} thumbTintColor={'#fafafa'} lowerLimit={0} upperLimit={30} onValueChange={(val) => newLunarPhaseData(Math.floor(val))} style={homeStyles.phaseSlider} minimumValue={0} maximumValue={30} minimumTrackTintColor="#acacac" maximumTrackTintColor="#acacac"/>
      </View>
      <View style={homeStyles.thumbs}>
        <View style={homeStyles.navBar}>
          <TouchableHighlight onPressIn={()=>{navigation.navigate('Home');}} style={homeStyles.navBarButton}>
            <Text style={homeStyles.navBarButtonText}>🌕</Text>
          </TouchableHighlight>
          <TouchableHighlight onPressIn={()=>{navigation.navigate('APOD');}}  style={homeStyles.navBarButton}>
            <Text style={homeStyles.navBarButtonText}>🔭</Text>
          </TouchableHighlight>
          <TouchableHighlight onPressIn={()=>{navigation.navigate('Preferences');}}  style={homeStyles.navBarButton}>
            <Text style={homeStyles.navBarButtonText}>🥂</Text>
          </TouchableHighlight>
          <TouchableHighlight onPressIn={()=>{navigation.navigate('Preferences');}}  style={homeStyles.navBarButton}>
            <Text style={homeStyles.navBarButtonText}>⚙</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

export default Home;
