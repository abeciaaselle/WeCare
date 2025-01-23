import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { ref, onValue } from 'firebase/database';
import { database } from './firebaseConfig'; // Adjust the path as needed

const CalendarScreen = () => {
  const [notifications, setNotifications] = useState({});
  
  // Fetch notifications from Firebase
  useEffect(() => {
    const notificationsRef = ref(database, 'notifications');
    onValue(notificationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Group notifications by date
        const groupedNotifications = {};
        Object.entries(data).forEach(([notificationId, times]) => {
          Object.entries(times).forEach(([timeId, details]) => {
            const date = details.timestamp.split(' ')[0]; // Extract date from timestamp
            if (!groupedNotifications[date]) {
              groupedNotifications[date] = [];
            }
            groupedNotifications[date].push(`${details.timestamp} - ${details.status}`);
          });
        });
        setNotifications(groupedNotifications);
      }
    });
  }, []);

  const handleDayPress = (day) => {
    const selectedDate = day.dateString; // Get the selected date as a string (e.g., '2024-10-15')
    if (notifications[selectedDate]) {
      // If there are notifications for the selected date
      Alert.alert(
        `Notifications for ${selectedDate}`,
        notifications[selectedDate].join('\n') // Join notifications with a newline
      );
    } else {
      // If no notifications are available for the selected date
      Alert.alert(`Notifications`, `No notifications for ${selectedDate}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Report</Text>
      <Calendar
        // Marked dates
        markedDates={Object.keys(notifications).reduce((acc, date) => {
          acc[date] = { marked: true, dotColor: 'red' };
          return acc;
        }, {})}
        // Handle day press
        onDayPress={handleDayPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, marginBottom: 20 },
});

export default CalendarScreen;
