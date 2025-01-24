import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Button, TextInput } from 'react-native';
import { patientDatabase } from './firebaseConfig';
import { ref, get, update, remove } from 'firebase/database';
import Icon from 'react-native-vector-icons/Ionicons';  // Import icons

const PatientRecordsScreen = ({ navigation }) => {
  const [patients, setPatients] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editedPatient, setEditedPatient] = useState({ name: '', age: '', medicine: '', compartment: '' });

  useEffect(() => {
    const fetchPatients = async () => {
      const patientsRef = ref(patientDatabase, 'patients/');
      try {
        const snapshot = await get(patientsRef);
        if (snapshot.exists()) {
          const patientsData = snapshot.val();
          const patientsArray = Object.keys(patientsData).map((key) => ({
            id: key,
            ...patientsData[key],
          }));
          setPatients(patientsArray);
        } else {
          console.log('No patients found.');
        }
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
    fetchPatients();
  }, []);

  const handleDelete = async (patientId) => {
    try {
      const patientRef = ref(patientDatabase, 'patients/' + patientId);
      await remove(patientRef);
      setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== patientId));
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setEditedPatient({ ...patient });
    setModalVisible(true);
  };

  const handleSubmitEdit = async () => {
    try {
      const patientRef = ref(patientDatabase, 'patients/' + selectedPatient.id);
      await update(patientRef, editedPatient);
      alert('Patient record updated successfully!');
      setModalVisible(false);
      setPatients((prevPatients) => prevPatients.map((patient) =>
        patient.id === selectedPatient.id ? { ...patient, ...editedPatient } : patient
      ));
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {patients.map((patient) => (
        <View key={patient.id} style={styles.record}>
          <Text style={styles.patientName}>{patient.name}</Text>
          <Text style={styles.patientDetails}>{patient.age}</Text>
          <Text style={styles.patientDetails}>{patient.medicine}</Text>
          <Text style={styles.patientDetails}>{patient.compartment}</Text>

          {/* Edit and Delete Icons in the upper-right corner */}
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => handleEdit(patient)} style={styles.iconButton}>
              <Icon name="create-outline" size={24} color="#4CAF50" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(patient.id)} style={styles.iconButton}>
              <Icon name="close-circle-outline" size={24} color="#FF5722" />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Modal for editing patient */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Name"
              value={editedPatient.name}
              onChangeText={(text) => setEditedPatient({ ...editedPatient, name: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Age"
              value={editedPatient.age}
              onChangeText={(text) => setEditedPatient({ ...editedPatient, age: text })}
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              placeholder="Medicine"
              value={editedPatient.medicine}
              onChangeText={(text) => setEditedPatient({ ...editedPatient, medicine: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Compartment"
              value={editedPatient.compartment}
              onChangeText={(text) => setEditedPatient({ ...editedPatient, compartment: text })}
              style={styles.input}
            />
            <Button title="Save Changes" onPress={handleSubmitEdit} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  record: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    position: 'relative',
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5A4FCF', // Admin purple
  },
  patientDetails: {
    fontSize: 16,
    marginVertical: 4
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButton: {
    marginLeft: 10,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    width: 300,
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
});

export default PatientRecordsScreen;
