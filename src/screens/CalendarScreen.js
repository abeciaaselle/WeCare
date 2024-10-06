// src/screens/CalendarScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Schedule</Text>
      <Calendar
        // You can mark dates with colors
        markedDates={{
          '2024-10-15': { selected: true, marked: true, selectedColor: 'blue' },
          '2024-10-16': { marked: true, dotColor: 'red' },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, marginBottom: 20 },
});

export default CalendarScreen;
