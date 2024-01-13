/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react';
import {View, Text, ImageBackground, TouchableHighlight, PermissionsAndroid, ScrollView, Settings} from 'react-native';
import preferencesStyles from './preferences.styles';


const Preferences = ({navigation}) => {

  useEffect(()=>{
    console.log('settings');
  }, []);

  return (
    <View style={preferencesStyles.container}>
      <Text>Preferences</Text>
      <View style={preferencesStyles.preferencesNavBar}>
          <View style={preferencesStyles.navBar}>
            <TouchableHighlight onPressIn={()=>{navigation.navigate('Home');}} style={preferencesStyles.navBarButton}>
              <Text style={preferencesStyles.navBarButtonText}>🌕</Text>
            </TouchableHighlight>
            <TouchableHighlight onPressIn={()=>{navigation.navigate('APOD');}}  style={preferencesStyles.navBarButton}>
              <Text style={preferencesStyles.navBarButtonText}>🔭</Text>
            </TouchableHighlight>
            <TouchableHighlight onPressIn={()=>{navigation.navigate('Preferences');}}  style={preferencesStyles.navBarButton}>
              <Text style={preferencesStyles.navBarButtonText}>🥂</Text>
            </TouchableHighlight>
            <TouchableHighlight onPressIn={()=>{navigation.navigate('Preferences');}}  style={preferencesStyles.navBarButton}>
              <Text style={preferencesStyles.navBarButtonText}>⚙</Text>
            </TouchableHighlight>
          </View>
        </View>
    </View>
  );
};

export default Preferences;
