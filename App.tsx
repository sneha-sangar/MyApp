import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import '@react-native-firebase/app';  // Ensures Firebase is initialized
import { Button } from 'react-native';


// @ts-ignore
import LoginScreen from './src/LoginScreen';
// @ts-ignore
import SignUpScreen from './src/SignUpScreen';
// @ts-ignore
import HomeScreen from './src/Homescreen';
// @ts-ignore
import ForgotPasswordScreen from './src/ForgotPassword';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  // Listen to authentication state changes
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(currentUser => {
      setUser(currentUser);
      if (initializing) setInitializing(false);
    });

    return unsubscribe; // Clean up subscription
  }, [initializing]);

  // If initializing, return null or show a loading screen
  if (initializing) return null;

  // Logout function
  const handleLogout = async () => {
    try {
      await auth().signOut();
      setUser(null);  // Update user state after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerRight: () => (
                <Button
                  onPress={handleLogout}
                  title="Logout"
                  color="#1DC9b7"
                />
              ),
            }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
