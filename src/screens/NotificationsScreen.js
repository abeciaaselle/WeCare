import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { database } from './firebaseConfig'; // Adjust the path as needed

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState({});

  useEffect(() => {
    const notificationsRef = ref(database, 'notifications');
    onValue(notificationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const groupedNotifications = {};
        Object.entries(data).forEach(([notificationId, times]) => {
          groupedNotifications[notificationId] = [
            { label: "Morning", ...times["1"] },
            { label: "Noon", ...times["2"] },
            { label: "Evening", ...times["3"] },
          ];
        });
        setNotifications(groupedNotifications);
      }
    });
  }, []);

  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      {Object.keys(notifications).length === 0 ? (
        <Text style={styles.emptyText}>No notifications available.</Text>
      ) : (
        Object.entries(notifications).map(([date, times]) => (
          <View key={date} style={styles.dayContainer}>
            <Text style={styles.dateText}>{formatDate(date)}</Text>
            {times.map((time, index) => (
              <View
                key={index}
                style={[
                  styles.notificationContainer,
                  { backgroundColor: time.status === "missed" ? "#FFCCCC" : "#CCFFCC" },
                ]}
              >
                <Text style={styles.labelText}>{time.label}</Text>
                <Text style={styles.notificationText}>{time.timestamp}</Text>
                <Text style={styles.statusText}>{time.status}</Text>
              </View>
            ))}
          </View>
        ))
      )}
    </ScrollView>
  );
};

// Helper function to format the notification ID as a date
const formatDate = (notificationId) => {
  const date = new Date(notificationId); // Convert notification ID to Date object
  if (isNaN(date)) {
    // Handle invalid date if the parsing fails
    return "";
  }
  return date.toDateString(); // Converts to a readable date (e.g., "Wed Jan 15 2025")
};

const styles = StyleSheet.create({
  dayContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 0,
    textAlign: 'center',
  },
  notificationContainer: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  notificationText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default NotificationsScreen;
