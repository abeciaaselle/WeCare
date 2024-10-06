// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingPage from './src/screens/LandingPage';
import ProfileSelectionScreen from './src/screens/ProfileSelectionScreen';
import EnterPasswordScreen from './src/screens/EnterPasswordScreen';
import AdminScreen from './src/screens/AdminScreen';
import HeadNurseScreen from './src/screens/HeadNurseScreen';
import StaffScreen from './src/screens/StaffScreen';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';
import CalendarScreen from './src/screens/CalendarScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="ProfileSelection" component={ProfileSelectionScreen} />
        <Stack.Screen name="EnterPassword" component={EnterPasswordScreen} />
        <Stack.Screen name="Admin" component={AdminScreen} />
        <Stack.Screen name="Head Nurse" component={HeadNurseScreen} />
        <Stack.Screen name="Staff" component={StaffScreen} />
        <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
