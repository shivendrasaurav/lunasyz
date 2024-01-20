/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import eventStyles from './events.styles';

const Events = ({navigation}) => {

  return (
    <View style={eventStyles.container}>
      <Text>Events</Text>
      <View style={eventStyles.eventsNavBar}>
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
            <TouchableHighlight onPressIn={()=>{navigation.navigate('Preferences');}}  style={eventStyles.navBarButton}>
              <Text style={eventStyles.navBarButtonText}>⚙</Text>
            </TouchableHighlight>
          </View>
        </View>
    </View>
  );
};

export default Events;
