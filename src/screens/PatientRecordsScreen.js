import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, Button, Animated } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const PatientRecordsScreen = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editedPatient, setEditedPatient] = useState({
    name: '',
    age: '',
    medicine: '',
    compartment: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  const [nameFocus] = useState(new Animated.Value(0));
  const [ageFocus] = useState(new Animated.Value(0));
  const [medicineFocus] = useState(new Animated.Value(0));
  const [compartmentFocus] = useState(new Animated.Value(0));

  // Fetch patients when the component mounts
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://10.0.0.38:3000/api/patients');
        setPatients(response.data);
        setFilteredPatients(response.data);  // Initially display all patients
      } catch (error) {
        alert('Error fetching patients!');
        console.error(error);
      }
    };

    fetchPatients();
  }, []);

  // Filter patients by name based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPatients(patients);  // Show all patients if search is empty
    } else {
      const filtered = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPatients(filtered);
    }
  }, [searchTerm, patients]);

  // Handle delete functionality
  const handleDelete = async (patientId) => {
    try {
      await axios.delete(`http://10.0.0.38:3000/api/patients/${patientId}`);
      alert('Patient record deleted successfully!');
      // Remove deleted patient from state
      setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== patientId));
      setFilteredPatients((prevFiltered) => prevFiltered.filter((patient) => patient.id !== patientId));
    } catch (error) {
      alert('Error deleting patient!');
      console.error(error);
    }
  };

  // Handle edit functionality
  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setEditedPatient({ ...patient });
    setModalVisible(true);
  };

  // Submit edited data to back-end
  const handleSubmitEdit = async () => {
    try {
      await axios.put(`http://10.0.0.38:3000/api/patients/${selectedPatient.id}`, editedPatient);
      alert('Patient record updated successfully!');
      setModalVisible(false);

      // Update patient data in the state directly
      setPatients((prevPatients) =>
        prevPatients.map((patient) =>
          patient.id === selectedPatient.id ? { ...patient, ...editedPatient } : patient
        )
      );
      setFilteredPatients((prevFiltered) =>
        prevFiltered.map((patient) =>
          patient.id === selectedPatient.id ? { ...patient, ...editedPatient } : patient
        )
      );
    } catch (error) {
      alert('Error updating patient!');
      console.error(error);
    }
  };

  const handleFocus = (focusAnim) => {
    Animated.timing(focusAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = (focusAnim) => {
    Animated.timing(focusAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <Ionicons name="search" size={24} color="#5A4FCF" style={styles.searchIcon} />
      </View>

      {filteredPatients.length > 0 ? (
        filteredPatients.map((patient) => (
          <View key={patient.id} style={styles.record}>
            <Text style={styles.patientName}>{patient.name}</Text>
            <Text style={styles.patientDetails}>Age: {patient.age}</Text>
            <Text style={styles.patientDetails}>Medicine: {patient.medicine}</Text>
            <Text style={styles.patientDetails}>Compartment: {patient.compartment}</Text>

            {/* Edit and Delete icons */}
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => handleEdit(patient)}>
                <Ionicons name="create-outline" size={22} color="#5A4FCF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(patient.id)}>
                <Ionicons name="close-circle-outline" size={22} color="#FF4C4C" />
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text>No patients found</Text>
      )}

      {/* Modal for editing patient */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Animated.Text
              style={[styles.floatingLabel, { top: nameFocus.interpolate({ inputRange: [0, 1], outputRange: [14, -10] }) }]}
            >
              Name
            </Animated.Text>
            <TextInput
              style={styles.input}
              value={editedPatient.name}
              onFocus={() => handleFocus(nameFocus)}
              onBlur={() => handleBlur(nameFocus)}
              onChangeText={(text) => setEditedPatient({ ...editedPatient, name: text })}
              placeholder=" "
            />

            <Animated.Text
              style={[styles.floatingLabel, { top: ageFocus.interpolate({ inputRange: [0, 1], outputRange: [14, -10] }) }]}
            >
              Age
            </Animated.Text>
            <TextInput
              style={styles.input}
              value={editedPatient.age}
              onFocus={() => handleFocus(ageFocus)}
              onBlur={() => handleBlur(ageFocus)}
              onChangeText={(text) => setEditedPatient({ ...editedPatient, age: text })}
              placeholder=" "
              keyboardType="numeric"
            />

            <Animated.Text
              style={[styles.floatingLabel, { top: medicineFocus.interpolate({ inputRange: [0, 1], outputRange: [14, -10] }) }]}
            >
              Medicine
            </Animated.Text>
            <TextInput
              style={styles.input}
              value={editedPatient.medicine}
              onFocus={() => handleFocus(medicineFocus)}
              onBlur={() => handleBlur(medicineFocus)}
              onChangeText={(text) => setEditedPatient({ ...editedPatient, medicine: text })}
              placeholder=" "
            />

            <Animated.Text
              style={[styles.floatingLabel, { top: compartmentFocus.interpolate({ inputRange: [0, 1], outputRange: [14, -10] }) }]}
            >
              Compartment
            </Animated.Text>
            <TextInput
              style={styles.input}
              value={editedPatient.compartment}
              onFocus={() => handleFocus(compartmentFocus)}
              onBlur={() => handleBlur(compartmentFocus)}
              onChangeText={(text) => setEditedPatient({ ...editedPatient, compartment: text })}
              placeholder=" "
            />

            <Button title="Save Changes" onPress={handleSubmitEdit} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginLeft: 10,
  },
  record: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    position: 'relative', // Allow absolute positioning of icons
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
    width: 60, // Space for both icons
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background overlay
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    width: 300,
    borderRadius: 10,
  },
  floatingLabel: {
    position: 'static',
    left: 12,
    fontSize: 16,
    color: '#5A4FCF', // Admin purple
    fontWeight: 'bold',
    transition: '0.3s ease',
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
