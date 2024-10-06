// src/screens/HeadNurseScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeadNurseScreen = ({ navigation }) => {
  const [patients, setPatients] = useState([]);
  const [medicine, setMedicine] = useState('');

  const fetchPatients = async () => {
    const storedPatients = await AsyncStorage.getItem('patients');
    if (storedPatients) {
      setPatients(JSON.parse(storedPatients));
    }
  };

  const editPatient = (index) => {
    const updatedPatients = [...patients];
    updatedPatients[index].medicine = medicine;
    setPatients(updatedPatients);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Head Nurse Panel</Text>
      <Button title="Load Patients" onPress={fetchPatients} />
      {patients.map((patient, index) => (
        <View key={index} style={styles.patientContainer}>
          <Text>Patient Name: {patient.name}</Text>
          <Text>Current Medicine: {patient.medicine}</Text>
          <TextInput
            placeholder="Edit Medicine"
            value={medicine}
            onChangeText={setMedicine}
            style={styles.input}
          />
          <Button title="Update" onPress={() => editPatient(index)} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, marginBottom: 20 },
  patientContainer: { marginBottom: 15 },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 5 },
});

export default HeadNurseScreen;
