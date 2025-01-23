import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';

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
      navigation.navigate(profile); // Navigate to corresponding profile home screen
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/Login.png')} // Replace with your background image path
      style={styles.background}
    >
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
        <TouchableOpacity style={styles.button} onPress={handlePasswordSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('PasswordRecovery')}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Ensures the background image covers the entire screen
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Slight white overlay to ensure content is readable
    borderRadius: 10, // Optional: To make the container's corners rounded
  },
  title: {
    fontSize: 22,
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#FFF',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#5A4FCF',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotText: {
    color: '#5A4FCF',
    fontSize: 14,
    marginTop: 10,
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default EnterPasswordScreen;
