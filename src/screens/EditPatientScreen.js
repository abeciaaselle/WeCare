import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const EditPatientScreen = ({ route, navigation }) => {
  const patient = route.params?.patient || { name: '', age: '', medicine: '', compartment: '' };

  const [name, setName] = useState(patient.name);
  const [age, setAge] = useState(patient.age);
  const [medicine, setMedicine] = useState(patient.medicine);
  const [compartment, setCompartment] = useState(patient.compartment);

  const saveChanges = () => {
    // Logic to save the updated patient data (e.g., update state or database)
    alert('Changes saved successfully!');
    navigation.goBack(); // Navigate back after saving
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Patient</Text>
      <TextInput
        placeholder="Name"
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
      <Button title="Save Changes" onPress={saveChanges} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 8,
    fontSize: 16,
  },
});

export default EditPatientScreen;