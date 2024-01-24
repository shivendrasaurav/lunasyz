/* eslint-disable prettier/prettier */

import {StyleSheet} from 'react-native';

const eventStyles = StyleSheet.create({
  eventWrapper: {
    flex: 1,
    height: '100%',
    backgroundColor: '#0e0e0e',
  },
  calenderWrapper: {
    flex: 11,
  },
  calenderTitle: {
    fontSize: 24,
    color: '#fafafa',
    textAlign: 'center',
  },
  calenderRender: {
    display: 'flex',
    margin: 3,
    padding: 3,
    borderRadius: 12,
    flex: 0.8,
  },
  calenderRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarDateUpperWrapper: {
    flex: 1,
  },
  calenderDateWrapper: {
    borderRadius: 12,
  },
  calenderDateWrapperToday: {
    borderRadius: 12,
    backgroundColor: '#0cbdae',
  },
  calenderDate: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
  },
  calenderMonth: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  eventNavBar: {
    flex: 1,
    flexDirection: 'row',
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

export default eventStyles;
