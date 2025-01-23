import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileSelectionScreen = ({ navigation }) => {
  const profiles = [
    { name: 'Admin', icon: 'person-circle' },
    { name: 'Head Nurse', icon: 'medkit' },
    { name: 'Staff', icon: 'people-circle' },
  ];

  return (
    <ImageBackground
      source={require('../../assets/images/SelectProfile.png')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Select Your Profile</Text>
        <View style={styles.profilesContainer}>
          {profiles.map((profile) => (
            <TouchableOpacity
              key={profile.name}
              style={styles.profileCard}
              onPress={() => navigation.navigate('EnterPassword', { profile: profile.name })}
            >
              <Ionicons name={profile.icon} size={40} color="#5A4FCF" /> {/* Icon with soft purple */}
              <Text style={styles.profileText}>{profile.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Covers the whole screen
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-start', // Aligns content to the top of the screen
    alignItems: 'center', // Centers the profile cards horizontally
    padding: 20,
  },
  title: {
    color: '#000', // Black text for the title
    fontSize: 24,
    fontFamily: 'System', // Clean and professional font
    marginTop: 40, // Adds space from the top of the screen
    marginBottom: 20, // Adds space below the title
    textAlign: 'center',
  },
  profilesContainer: {
    flexDirection: 'row', // Arrange profiles horizontally
    justifyContent: 'space-around', // Distributes the profile cards evenly
    alignItems: 'center', // Centers the profile containers vertically
    marginTop: 100,// Increased space between title and profiles
  },
  profileCard: {
    width: 110, // Profile card width
    height: 150, // Profile card height
    borderRadius: 10, // Rounded corners
    justifyContent: 'center', // Centers content inside each card
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Clean white card background
    margin: 10, // Space between cards
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 10},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 100,
  },
  profileText: {
    color: '#000', // Black text for the profile names
    fontSize: 14,
    fontFamily: 'System',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default ProfileSelectionScreen;
