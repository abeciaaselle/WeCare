import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import NotificationsScreen from './NotificationsScreen';
import PatientRecordsScreen from './PatientRecordsScreen';
import { View, ImageBackground, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const StaffScreen = () => {
  return (
    <ImageBackground
      source={require('../../assets/images/Homepage(all).png')} // Use the same professional background image
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: styles.tabBarStyle, // Custom tab bar style
            tabBarActiveTintColor: '#5A4FCF', // Active icon color (purple)
            tabBarInactiveTintColor: '#888', // Inactive icon color (gray)
            tabBarLabelStyle: styles.tabBarLabel, // Label style for tabs
          }}
        >
          <Tab.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="notifications" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Records"
            component={PatientRecordsScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="document-text" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center', // Centers the content for a reflective look
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Slightly opaque overlay
  },
  tabBarStyle: {
    backgroundColor: '#FFF', // White background for the tab bar
    borderTopWidth: 0, // Removes the top border for a cleaner look
    height: 70, // Increased height for better icon visibility
    paddingBottom: 20, // Padding added to the bottom of the tab bar
  },
  tabBarLabel: {
    fontSize: 10, // Smaller label font size for a minimalistic design
    fontWeight: 'bold', // Bold labels for improved readability
  },
});

export default StaffScreen;
