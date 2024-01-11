/* eslint-disable prettier/prettier */

import {StyleSheet} from 'react-native';

const apodStyles = StyleSheet.create({
  apodWrapper: {
    flex: 1,
    height: '100%',
  },
  apodBackground: {
    height: '100%',
    width: '100%',
  },
  apodInfo: {
    flex: 8,
  },
  apodTitle: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  apodTitleText:{
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#fadafa',
    paddingTop: 8,
    color: '#0e0e0e',
  },
  apodNavBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fadafa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBar: {
    width: '80%',
    borderRadius: 36,
    backgroundColor: '#0e0e2e',
    flexDirection: 'row',
  },
  navBarButton: {
    padding: 12,
    flex: 1,
    borderRadius: 36,
  },
  navBarButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fafafa',
  },
});

export default apodStyles;
