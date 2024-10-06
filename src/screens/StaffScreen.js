// src/screens/StaffScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StaffScreen = () => {
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    const storedPatients = await AsyncStorage.getItem('patients');
    if (storedPatients) {
      setPatients(JSON.parse(storedPatients));
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Staff Panel</Text>
      {patients.map((patient, index) => (
        <View key={index} style={styles.patientContainer}>
          <Text>Patient Name: {patient.name}</Text>
          <Text>Age: {patient.age}</Text>
          <Text>Medicine: {patient.medicine}</Text>
          <Text>Compartment: {patient.compartment}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, marginBottom: 20 },
  patientContainer: { marginBottom: 15 },
});

export default StaffScreen;
