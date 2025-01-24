import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


const AlarmScreen = () => {
  const [morningTime, setMorningTime] = useState(new Date());
  const [noonTime, setNoonTime] = useState(new Date());
  const [eveningTime, setEveningTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [currentAlarm, setCurrentAlarm] = useState('');


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();


    if (event.type === 'set') {
      if (currentAlarm === 'morning') {
        setMorningTime(currentDate);
      } else if (currentAlarm === 'noon') {
        setNoonTime(currentDate);
      } else if (currentAlarm === 'evening') {
        setEveningTime(currentDate);
      }
    }


    // Close the picker after selecting the time
    setShowPicker(false);
  };


  // Function to format time in 12-hour format (with AM/PM)
  const format12Hour = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Set Alarms</Text>


      {/* Morning Alarm */}
      <View style={styles.alarmTimeContainer}>
        <Text style={styles.timeLabel}>Set Morning Alarm</Text>
        <TouchableOpacity
          style={styles.pickTimeButton}
          onPress={() => {
            setCurrentAlarm('morning');
            setShowPicker(true); // Show the time picker
          }}
        >
          <Text style={styles.buttonText}>Pick Morning Time</Text>
        </TouchableOpacity>
       
        <Text style={styles.selectedTime}>
          {`Morning Time: ${format12Hour(morningTime)}`}
        </Text>
      </View>


      {/* Noon Alarm */}
      <View style={styles.alarmTimeContainer}>
        <Text style={styles.timeLabel}>Set Noon Alarm</Text>
        <TouchableOpacity
          style={styles.pickTimeButton}
          onPress={() => {
            setCurrentAlarm('noon');
            setShowPicker(true); // Show the time picker
          }}
        >
          <Text style={styles.buttonText}>Pick Noon Time</Text>
        </TouchableOpacity>
       
        <Text style={styles.selectedTime}>
          {`Noon Time: ${format12Hour(noonTime)}`}
        </Text>
      </View>


      {/* Evening Alarm */}
      <View style={styles.alarmTimeContainer}>
        <Text style={styles.timeLabel}>Set Evening Alarm</Text>
        <TouchableOpacity
          style={styles.pickTimeButton}
          onPress={() => {
            setCurrentAlarm('evening');
            setShowPicker(true); // Show the time picker
          }}
        >
          <Text style={styles.buttonText}>Pick Evening Time</Text>
        </TouchableOpacity>
       
        <Text style={styles.selectedTime}>
          {`Evening Time: ${format12Hour(eveningTime)}`}
        </Text>
      </View>


      {/* Show DateTimePicker */}
      {showPicker && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          is24Hour={true} // Military format (24-hour)
          display="spinner"
          onChange={onChange}
          style={styles.dateTimePicker}
        />
      )}


      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={() => alert("Alarms set!")}>
        <Text style={styles.saveButtonText}>Save Alarms</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#5A4FCF', // Admin purple color
  },
  alarmTimeContainer: {
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 15,
  },
  timeLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  pickTimeButton: {
    backgroundColor: '#5A4FCF', // Purple color for the button
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateTimePicker: {
    width: '100%',
    marginTop: 20,
  },
  selectedTime: {
    marginTop: 10,
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#5A4FCF', // Purple color for the save button
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    marginTop: 30,
    alignItems: 'center',
    marginBottom: 20, // Adds margin at the bottom to ensure visibility
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default AlarmScreen;
