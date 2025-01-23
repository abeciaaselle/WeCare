import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AdminScreen from './src/screens/AdminScreen';
import HeadNurseScreen from './src/screens/HeadNurseScreen';
import StaffScreen from './src/screens/StaffScreen';
import LandingPage from './src/screens/LandingPage';
import ProfileSelectionScreen from './src/screens/ProfileSelectionScreen';
import EnterPasswordScreen from './src/screens/EnterPasswordScreen';
import AddPatientScreen from './src/screens/AddPatientScreen';
import PatientRecordsScreen from './src/screens/PatientRecordsScreen';
import PasswordRecoveryScreen from './src/screens/PasswordRecoveryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="ProfileSelection" component={ProfileSelectionScreen} />
        <Stack.Screen name="EnterPassword" component={EnterPasswordScreen} />
        <Stack.Screen name="PasswordRecovery" component={PasswordRecoveryScreen} />
        <Stack.Screen name="Admin" component={AdminScreen} />
        <Stack.Screen name="Head Nurse" component={HeadNurseScreen} />
        <Stack.Screen name="Staff" component={StaffScreen} />
        <Stack.Screen name="AddPatient">
          {(props) => <AddPatientScreen {...props} setRefresh={setRefresh} />}
        </Stack.Screen>
        <Stack.Screen name="PatientRecords">
          {(props) => <PatientRecordsScreen {...props} refresh={refresh} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
