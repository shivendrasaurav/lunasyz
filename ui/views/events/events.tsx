/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react';
import {View, Text, PermissionsAndroid, TouchableHighlight} from 'react-native';
import SunCalc from 'suncalc';
import Geolocation from 'react-native-geolocation-service';
import eventStyles from './events.styles';

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

const hindiPhaseCalender = ['अमावस्या', 'शुक्ल पक्ष - परिबा', 'शुक्ल पक्ष - दूज', 'शुक्ल पक्ष - तृतीया', 'शुक्ल पक्ष - चतुर्थी', 'शुक्ल पक्ष - पंचमी', 'शुक्ल पक्ष - षष्ठी', 'शुक्ल पक्ष - सप्तमी', 'शुक्ल पक्ष - अष्टमी', 'शुक्ल पक्ष - नवमी', 'शुक्ल पक्ष - दशमी', 'शुक्ल पक्ष-एकादशी', 'शुक्ल पक्ष - द्वादशी', 'शुक्ल पक्ष - त्रयोदशी', 'शुक्ल पक्ष - चतुर्दशी', 'पूर्णिमा', 'कृष्ण पक्ष - परिबा', 'कृष्ण पक्ष - दूज', 'कृष्ण पक्ष - तृतीया', 'कृष्ण पक्ष - चतुर्थी', 'कृष्ण पक्ष - पंचमी', 'कृष्ण पक्ष - षष्ठी', 'कृष्ण पक्ष - सप्तमी', 'कृष्ण पक्ष - अष्टमी', 'कृष्ण पक्ष - नवमी', 'कृष्ण पक्ष - दशमी', 'कृष्ण पक्ष-एकादशी', 'कृष्ण पक्ष - द्वादशी', 'कृष्ण पक्ष - त्रयोदशी', 'कृष्ण पक्ष - चतुर्दशी'];

const newMoon2425 = ['Thu Jan 11 2024', 'Sat Feb 10 2024', 'Sun Mar 10 2024', 'Mon Apr 08 2024', 'Wed May 08 2024', 'Thu Jun 06 2024', 'Sat Jul 06 2024', 'Sun Aug 04 2024', 'Tue Sep 03 2024', 'Thu Oct 03 2024', 'Fri Nov 01 2024', 'Sun Dec 01 2024'];
const qOne2425 = ['Thu Jan 18 2024', 'Fri Feb 16 2024', 'Sun Mar 17 2024', 'Tue Apr 16 2024', 'Wed May 15 2024', 'Fri Jun 14 2024', 'Sun Jul 14 2024', 'Mon Aug 12 2024', 'Wed Sep 11 2024', 'Fri Oct 11 2024', 'Sat Nov 09 2024', 'Sun Dec 08 2024'];
const fullMoon2425 = ['Thu Jan 25 2024', 'Sat Feb 24 2024', 'Mon Mar 25 2024', 'Wed Apr 24 2024', 'Thu May 23 2024', 'Sat Jun 22 2024', 'Sun Jul 21 2024', 'Mon Aug 19 2024', 'Wed Sep 18 2024', 'Thu Oct 17 2024', 'Sat Nov 16 2024', 'Invalid Date'];
const qThree2425 = ['Sat Feb 03 2024', 'Sun Mar 03 2024', 'Tue Apr 02 2024', 'Wed May 01 2024', 'Thu May 30 2024', 'Sat Jun 29 2024', 'Sun Jul 28 2024', 'Mon Aug 26 2024', 'Wed Sep 25 2024', 'Thu Oct 24 2024', 'Sat Nov 23 2024', 'Mon Dec 23 2024'];

const getDateValue = () => {
  let today = new Date();
  return today.toDateString();
};

const getMoonPhase = (compDate: number, index: number) => {
  const newMoonDateNum = new Date(newMoon2425[index]);
  const qOneDateNum = new Date(qOne2425[index]);
  const fullMoonDateNum = new Date(fullMoon2425[index]);
  const qThreeDateNum = new Date(qThree2425[index]);
  const compDateNum = new Date(compDate);
  if (compDateNum.toDateString() === newMoonDateNum.toDateString()){
    return 'New Moon';
  }
  else if (compDateNum > newMoonDateNum && compDateNum < qOneDateNum){
    return 'Waxing Crescent';
  }
  else if (compDateNum.toDateString() === qOneDateNum.toDateString()){
    return 'First Quarter';
  }
  else if (compDateNum > qOneDateNum && compDateNum < fullMoonDateNum){
    return 'Waxing Gibbous';
  }
  else if (compDateNum.toDateString() === fullMoonDateNum.toDateString()){
    return 'Full Moon';
  }
  else if (compDateNum > fullMoonDateNum && compDateNum < qThreeDateNum){
    return 'Waning Gibbous';
  }
  else if (compDateNum.toDateString() === qThreeDateNum.toDateString()){
    return 'Last Quarter';
  }
  else if (compDateNum > qThreeDateNum){
    return 'Waning Crescent';
  }
};

const getThisLunarMonth = () => {
  // Initialize lastNewMoon with today's date
  let lastNewMoon = new Date(getDateValue());
  let lastIndex = 0;
  // Iterate through newMoon2425 to find the last new moon before today
  for (let i = 0; i < newMoon2425.length; i++) {
    let lastNewMoonDate = new Date(newMoon2425[i]);
    if (lastNewMoonDate > lastNewMoon) {
      lastNewMoon = new Date(newMoon2425[i - 1]); // Assign the previous new moon
      lastIndex = i - 1;
      break; // Exit the loop as we've found the last new moon
    }
  }

  // Create an empty array to store the calendar
  const calendar = [];

  // Add the last new moon to the calendar
  calendar.push({
    date: lastNewMoon.toDateString(),
    hindiPhaseName: hindiPhaseCalender[0],
    englishPhaseName: 'New Moon',
  });

  // Iterate over the hindiPhaseNames array
  for (let i = 1; i < hindiPhaseCalender.length; i++) {
    // Calculate the date for the next phase
    const date = new Date(lastNewMoon).setDate(lastNewMoon.getDate() + i);
    const engPhName = getMoonPhase(date, lastIndex);
    // Add the date and phase name to the calendar
    calendar.push({
      date: new Date(date).toDateString(),
      hindiPhaseName: hindiPhaseCalender[i],
      englishPhaseName: engPhName,
    });
  }

  return calendar;
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

const Events = ({navigation}) => {

  const [location, setLocation] = useState({'latitude': 20.23, 'longitude': -180.90});

  const getMonthlyLunarPhases = () =>{
    const monthDates = getThisLunarMonth();
    let lunarPhases = [];
    for (let i = 0; i < 30; i++){
      let date = new Date(monthDates[i].date);
      let isToday = false;
      let moonIllumination = SunCalc.getMoonIllumination(date);
      let phase = monthDates[i].englishPhaseName;
      //let month = months[date.getMonth()];
      //let dateNum = date.getDate();
      //let year = date.getFullYear();
      //const dateVal = month + ' ' + dateNum + ', ' + year;
      const moonPosition = SunCalc.getMoonPosition(date, location.latitude, location.longitude);
      const angle = moonIllumination.angle - moonPosition.parallacticAngle;
      lunarPhases.push({'isToday': isToday,'phaseImg': lunarPhaseKey[phase], 'date': date, 'phaseName': phase, 'phaseAngle': angle, 'phaseNameHindi': monthDates[i].hindiPhaseName});
    }
    return (lunarPhases);
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

  const calendarDataMakyr = () => {
    const monthlyData = getMonthlyLunarPhases();
    let today = new Date();
    let week: { isToday: boolean, phaseImg: any; date: Date; phaseName: string | undefined; phaseAngle: number; phaseNameHindi: string; }[] = [];
    const ovr: { isToday: boolean; phaseImg: any; date: Date; phaseName: string | undefined; phaseAngle: number; phaseNameHindi: string; }[][] = [];
    let cnt = 0;
    monthlyData.forEach(dates => {
        if (cnt === 6){
          ovr.push(week);
          week = [];
          cnt = 0;
        }
        let thisDay = new Date(dates.date);
        console.log(today.toDateString() + ', ' + thisDay.toDateString());
        if (today.toDateString() === thisDay.toDateString()){
          dates.isToday = true;
        }
        week.push(dates);
        cnt++;
    });
    ovr.push(week);

    return ovr;
  };

  const calendarData = calendarDataMakyr();

  useEffect(()=>{
    getLocation();
  }, []);

  return (
    <View style={eventStyles.eventWrapper}>
      <View style={eventStyles.calenderWrapper}>
        <Text style={eventStyles.calenderTitle}>{'\n'}Lunar Month{'\n\n'}</Text>
        <View style={eventStyles.calenderRender}>
            {calendarData.map(
              dates => (
                <View style={eventStyles.calenderRow}>
                  {dates.map(
                    calendarDate => (
                      <View style={eventStyles.calendarDateUpperWrapper}>
                        {
                          calendarDate.isToday === true ?
                          <View key={calendarDate.date.toDateString()} style={eventStyles.calenderDateWrapperToday}>
                            <Text style={eventStyles.calenderDate}>{calendarDate.date.getDate()}</Text>
                            <Text style={eventStyles.calenderMonth}>{months[calendarDate.date.getMonth()].substring(0, 3)}</Text>
                          </View>
                          :
                          <View style={eventStyles.calenderDateWrapper}>
                            <Text style={eventStyles.calenderDate}>{calendarDate.date.getDate()}</Text>
                            <Text style={eventStyles.calenderMonth}>{months[calendarDate.date.getMonth()].substring(0, 3)}</Text>
                          </View>
                        }
                      </View>
                    )
                  )}
                </View>
              )
            )}
        </View>
      </View>
      <View style={eventStyles.eventNavBar}>
        <View style={eventStyles.navBar}>
          <TouchableHighlight onPressIn={()=>{navigation.navigate('Home');}} style={eventStyles.navBarButton}>
            <Text style={eventStyles.navBarButtonText}>🌕</Text>
          </TouchableHighlight>
          <TouchableHighlight onPressIn={()=>{navigation.navigate('APOD');}}  style={eventStyles.navBarButton}>
            <Text style={eventStyles.navBarButtonText}>🔭</Text>
          </TouchableHighlight>
          <TouchableHighlight onPressIn={()=>{navigation.navigate('Events');}}  style={eventStyles.navBarButton}>
            <Text style={eventStyles.navBarButtonText}>🥂</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

export default Events;
