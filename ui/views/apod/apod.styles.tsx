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
    flex: 6,
    justifyContent: 'flex-end',
  },
  apodInfoTextWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  apodInfoText: {
    margin: 12,
    padding: 8,
    backgroundColor: '#fadafa88',
    color: '#0e0e0e',
    height: 'auto',
    fontSize: 20,
    borderRadius: 8,
  },
  apodTitle: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#fadafa',
  },
  apodTitleText:{
    fontSize: 20,
    padding: 8,
    marginLeft: 20,
    color: '#0e0e0e',
  },
  apodTitleButtons: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 28,
  },
  infoButton: {
    backgroundColor: '#495adf',
    borderRadius: 6,
    width: 'auto',
    height: 32,
    marginRight: 6,
  },
  infoButtonText: {
    padding: 6,
    fontSize: 14,
    color: '#fafafa',
    textAlign: 'center',
    paddingLeft: 18,
    paddingRight: 18,
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
