import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { signUp } from './FirebaseService';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }
  
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    // Password length validation (minimum 6 characters as required by Firebase)
    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }
  
    try {
      await signUp(email, password, name);
      navigation.navigate('Home');
    } catch (error) {
      alert(error.message);
    }
  };
  
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.title}>SignUp</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="black"
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="black"
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="black"
          secureTextEntry
          onChangeText={setPassword}
        />
        <View style={styles.buttonContainer}>
          <Button title="Sign Up" onPress={handleSignUp} color="#1DC9b7" />
        </View>
        <Text onPress={() => navigation.navigate('Login')} style={styles.link}>
          Already have an account? Login
        </Text>
      </View>
    </View>
  );
};

export default SignUpScreen;

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
