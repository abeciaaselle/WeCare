// src/screens/AdminScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminScreen = ({ navigation }) => {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [medicine, setMedicine] = useState('');
  const [compartment, setCompartment] = useState('');

  const addPatient = async () => {
    const newPatient = { name, age, medicine, compartment };
    const updatedPatients = [...patients, newPatient];
    setPatients(updatedPatients);

    // Save patients to AsyncStorage
    await AsyncStorage.setItem('patients', JSON.stringify(updatedPatients));

    setName('');
    setAge('');
    setMedicine('');
    setCompartment('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Panel</Text>
      {patients.map((patient, index) => (
        <View key={index} style={styles.patientContainer}>
          <Text>Patient Name: {patient.name}</Text>
          <Text>Age: {patient.age}</Text>
          <Text>Medicine: {patient.medicine}</Text>
          <Text>Compartment: {patient.compartment}</Text>
        </View>
      ))}
      <TextInput placeholder="Patient Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Age" value={age} onChangeText={setAge} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Medicine" value={medicine} onChangeText={setMedicine} style={styles.input} />
      <TextInput placeholder="Compartment" value={compartment} onChangeText={setCompartment} style={styles.input} />
      <Button title="Add Patient" onPress={addPatient} />
      <Button title="View Calendar" onPress={() => navigation.navigate('Calendar')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, marginBottom: 20 },
  patientContainer: { marginBottom: 15 },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 5 },
});

export default AdminScreen;
