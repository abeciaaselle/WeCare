import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { patientDatabase } from './firebaseConfig';
import { ref, update } from 'firebase/database';

const EditPatientScreen = ({ route, navigation }) => {
  const patient = route.params?.patient || { name: '', age: '', medicine: '', compartment: '', id: '' };

  const [name, setName] = useState(patient.name);
  const [age, setAge] = useState(patient.age);
  const [medicine, setMedicine] = useState(patient.medicine);
  const [compartment, setCompartment] = useState(patient.compartment);

  // Save changes to Firebase
  const saveChanges = async () => {
    try {
      const patientRef = ref(patientDatabase, 'patients/' + patient.id);  // Use patient ID
      await update(patientRef, {
        name: name,
        age: age,
        medicine: medicine,
        compartment: compartment,
      });

      Alert.alert('Success', 'Patient information updated!');
      navigation.goBack();  // Navigate back after saving
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update patient information.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Patient</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Medicine" value={medicine} onChangeText={setMedicine} style={styles.input} />
      <TextInput placeholder="Compartment" value={compartment} onChangeText={setCompartment} style={styles.input} />
      <Button title="Save Changes" onPress={saveChanges} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 8,
    fontSize: 16,
  },
});

export default EditPatientScreen;
