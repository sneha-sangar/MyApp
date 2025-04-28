import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { login } from './FirebaseService';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }
  
    // Optional: Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    try {
      await login(email, password);
      navigation.navigate('Home');
    } catch (error) {
      alert(error.message);
    }
  };
  
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="gray"
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="gray"
          secureTextEntry
          onChangeText={setPassword}
        />

        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={handleLogin} color="#1DC9b7" />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.link}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

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
  