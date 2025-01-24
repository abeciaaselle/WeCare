import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { patientDatabase, wecareDatabase } from './firebaseConfig';
import { ref, set } from 'firebase/database';  // Firebase methods

const AddPatientScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [medicine, setMedicine] = useState('');
  const [compartment, setCompartment] = useState('');

  const addPatientToDB = async () => {
    const patientId = Date.now().toString(); // Use timestamp as patient ID
    const patientRef = ref(patientDatabase, 'patients/' + patientId);  // Reference to the patients path in Firebase
    
    const patient = { name, age, medicine, compartment };
    try {
      await set(patientRef, patient);  // Set patient data in Firebase
      Alert.alert('Success', 'Patient added successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Error adding patient!');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Patient</Text>
      <TextInput
        placeholder="Patient Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Medicine"
        value={medicine}
        onChangeText={setMedicine}
        style={styles.input}
      />
      <TextInput
        placeholder="Compartment"
        value={compartment}
        onChangeText={setCompartment}
        style={styles.input}
      />
      <TouchableOpacity style={styles.addButton} onPress={addPatientToDB}>
        <Text style={styles.addButtonText}>Add Patient</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5A4FCF', // Admin purple color
    marginBottom: 30,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#5A4FCF', // Purple button for adding
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'gray',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    width: '100%',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddPatientScreen;
