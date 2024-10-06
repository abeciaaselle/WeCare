// src/screens/EnterPasswordScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const defaultPasswords = {
  Admin: 'admin123',
  'Head Nurse': 'hn123',
  Staff: 'staff123',
};

const EnterPasswordScreen = ({ route, navigation }) => {
  const { profile } = route.params;
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordSubmit = () => {
    if (password === defaultPasswords[profile]) {
      navigation.navigate(profile);  // Navigate to corresponding profile home screen
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Password for {profile}</Text>
      {error !== '' && <Text style={styles.error}>{error}</Text>}
      <TextInput
        secureTextEntry
        style={styles.input}
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Submit" onPress={handlePasswordSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, width: '80%', marginBottom: 10 },
  error: { color: 'red' },
});

export default EnterPasswordScreen;
