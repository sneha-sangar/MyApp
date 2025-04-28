import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import auth from '@react-native-firebase/auth';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Validation Error', 'Please enter your email address.');
      return;
    }
  
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }
  
    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert('Password Reset Email Sent', 'Check your email for the reset link.');
      navigation.navigate('Login'); // Optionally navigate to login
    } catch (error) {
      console.error('Reset error:', error);
      Alert.alert('Reset Failed', error.message);
    }
  };
  
  return (
       <View style={styles.screen}>
         <View style={styles.card}>
           <Text style={styles.title}>Forgot Password</Text>
      {/* <Text style={styles.heading}>Forgot Password</Text> */}
      <TextInput
        style={styles.input}
        placeholder="Enter your email address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
        <View style={styles.buttonContainer}>
                <Button title="Send Reset Email" onPress={handleResetPassword} color="#1DC9b7" />
              </View>
                <Text onPress={() => navigation.navigate('Login')} style={styles.link}>
                      Login
                    </Text>
      {/* <Button style={styles.buttonContainer} title="Send Reset Email" onPress={handleResetPassword} /> */}
    </View>
    </View>
    
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#edf1f7',
      padding: 20,
    },
    card: {
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: 20,
      padding: 25,
      elevation: 10, // for Android shadow
      shadowColor: '#000', // for iOS shadow
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: '#1DC9b7',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 12,
      marginBottom: 15,
      borderRadius: 10,
      color: 'black',
    },
    buttonContainer: {
      marginBottom: 20,
    },
    link: {
      color: '#1DC9b7',
      textAlign: 'center',
      marginTop: 10,
      fontWeight: '500',
    },
  });
  