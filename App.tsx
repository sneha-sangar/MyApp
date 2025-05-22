import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Button } from 'react-native';
import '@react-native-firebase/app'; // Firebase initialization

// Auth Screens
// @ts-ignore
import LoginScreen from './src/LoginScreen';
// @ts-ignore
import SignUpScreen from './src/SignUpScreen';
// @ts-ignore
import ForgotPasswordScreen from './src/ForgotPassword';

// Main App Screens
// @ts-ignore
import CareScreen from './src/CareScreen';
// @ts-ignore
import Tab from './src/bottom';
// @ts-ignore
import AddToCard from './src/AddToCard'
// @ts-ignore
// import example from './src/example';
// @ts-ignore
import { CartProvider } from './src/CartContext';
// @ts-ignore
import CheckoutScreen from './src/buy';
export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Home: undefined;
  Care: undefined;
  example: undefined;
  AddToCard:undefined;
  CheckoutScreen:undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(currentUser => {
      setUser(currentUser);
      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, [initializing]);

  if (initializing) return null;

  const handleLogout = async () => {
    try {
      await auth().signOut();
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
        <CartProvider>
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="Home"
              component={Tab}
              options={{
                headerShown: false,
              }}
            />
                        <Stack.Screen
              name="CheckoutScreen"
              component={CheckoutScreen}
              options={{
                headerShown: false,
              }}/>
            <Stack.Screen
              name="AddToCard"
              component={AddToCard}
              options={{
                headerShown: false,
              }}/>
            <Stack.Screen
              name="Care"
              component={CareScreen}
              options={{
                headerShown: false,
              }}
              // options={{
              //   headerRight: () => (
              //     <Button onPress={handleLogout} title="Logout" color="#1DC9b7" />
              //   ),
              // }}
            />
            {/* <Stack.Screen
              name="example"
              component={example}
              options={{
                headerRight: () => (
                  <Button onPress={handleLogout} title="Logout" color="#1DC9b7" />
                ),
              }}
            /> */}
          </>
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
    </CartProvider>
  );
};

export default App;
 

// // import { StyleSheet,Text,View,ScrollView,SafeAreaView,FlatList, StatusBar } from "react-native";
// // import pokemonlist from "./src/pokemon.json"
// // export default function App(){
// //   return(
// //     <FlatList
// //     data={pokemonlist}
// //     renderItem={({item})=>
// //     {
// //       return(
// //         <View style={Styles.card} key={item.id}>
// //           <Text style={Styles.cardText}>
// //             {item.type}
// //           </Text>
// //           <Text style={Styles.cardText}>
// //             {item.name}
// //           </Text>
// //         </View>
// //       )
// //     }}/>

// //   )
// // }

// // const Styles=StyleSheet.create({
// //   container:{
// //     flex:1,
// //     backgroundColor:'white',
// //     paddingTop:StatusBar.currentHeight
// //   },
// //   ScrollView:{
// //     paddingHorizontal:16
// //   },
// //   card:{
// //     backgroundColor:'pink',
// //     padding:17,
// //     borderRadius:8,
// //     borderWidth:1,
// //     marginBottom:16
// //   },
// //   cardText:{
// //     fontSize:20
// //   }
// // })

// import { useState } from "react";
// import { View,Button,Text,Modal } from "react-native";
// export default function App(){
//   const [ismodal,setisModal]=useState(false)
//   return{
//     <View>
//   }
// }