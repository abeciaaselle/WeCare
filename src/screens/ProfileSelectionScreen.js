// src/screens/ProfileSelectionScreen.js
import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

const ProfileSelectionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Profile</Text>
      <Button title="Admin" onPress={() => navigation.navigate('EnterPassword', { profile: 'Admin' })} />
      <Button title="Head Nurse" onPress={() => navigation.navigate('EnterPassword', { profile: 'Head Nurse' })} />
      <Button title="Staff" onPress={() => navigation.navigate('EnterPassword', { profile: 'Staff' })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});

export default ProfileSelectionScreen;
