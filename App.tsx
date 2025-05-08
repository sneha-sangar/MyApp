import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// @ts-ignore
import HomeScreen from './src/Homescreen';
// @ts-ignore
import CareScreen from './src/CareScreen';
// import Tab from './src/bottom';
// @ts-ignore
import Tab from './src/bottom';
// @ts-ignore
import example from './src/example';
export type RootStackParamList = {
  Home: undefined;
  Care: undefined;
  example:undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Tab} 
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Care"
          component={CareScreen}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="example"
          component={example}
          options={{ headerShown: false }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
 

// import { StyleSheet,Text,View,ScrollView,SafeAreaView,FlatList, StatusBar } from "react-native";
// import pokemonlist from "./src/pokemon.json"
// export default function App(){
//   return(
//     <FlatList
//     data={pokemonlist}
//     renderItem={({item})=>
//     {
//       return(
//         <View style={Styles.card} key={item.id}>
//           <Text style={Styles.cardText}>
//             {item.type}
//           </Text>
//           <Text style={Styles.cardText}>
//             {item.name}
//           </Text>
//         </View>
//       )
//     }}/>

//   )
// }

// const Styles=StyleSheet.create({
//   container:{
//     flex:1,
//     backgroundColor:'white',
//     paddingTop:StatusBar.currentHeight
//   },
//   ScrollView:{
//     paddingHorizontal:16
//   },
//   card:{
//     backgroundColor:'pink',
//     padding:17,
//     borderRadius:8,
//     borderWidth:1,
//     marginBottom:16
//   },
//   cardText:{
//     fontSize:20
//   }
// })