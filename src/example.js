// import React, {useState} from 'react';
// import {Text, TextInput, View,Image, ScrollView, FlatList,
//     StatusBar,TouchableOpacity} from 'react-native';
//     import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
//     type ItemData = {
//         id: string;
//         title: string;
//       };
      
//       const DATA: ItemData[] = [
//         {
//           id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//           title: 'First Item',
//         },
//         {
//           id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//           title: 'Second Item',
//         },
//         {
//           id: '58694a0f-3da1-471f-bd96-145571e29d72',
//           title: 'Third Item',
//         },
//       ];
      
//       type ItemProps = {
//         item: ItemData;
//         onPress: () => void;
//         backgroundColor: string;
//         textColor: string;
//       };
      
//       const Item = ({item, onPress, backgroundColor, textColor}: ItemProps) => (
//         <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
//           <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
//         </TouchableOpacity>
//       );
      
      

// const logo = {
//     uri: 'https://reactnative.dev/img/tiny_logo.png',
//     width: 64,
//     height: 64,
//   };
// const example = () => {
//     const [selectedId, setSelectedId] = useState<string>();
//   const [text, setText] = useState('');
//   return (
    
//     <View style={{padding: 10}}>
//         {/* Handling Text Input
//       <TextInput
//         style={{height: 40, padding: 25,color:'black',backgroundColor:'pink',marginTop:'50'}}
//         placeholder="Type here to translate!"
//         onChangeText={newText => setText(newText)}
//         defaultValue={text}
//       />
//       <Text style={{padding: 10, fontSize: 30}}>
//         {text
//           .split(' ')
//           .map(word => word && 'Hello')
//           .join(' ')}
//       </Text> */}
   



// {/* ScrollView
//   <ScrollView>
//     <Text style={{fontSize: 96}}>Scroll me plz</Text>
//     <Image source={logo} />
//     <Image source={logo} />
//     <Image source={logo} />
//     <Image source={logo} />
//     <Image source={logo} />
//     <Text style={{fontSize: 96}}>If you like</Text>
//     <Image source={logo} />
//     <Image source={logo} />
//     <Image source={logo} />
//     <Image source={logo} />
//     <Image source={logo} />
//     <Text style={{fontSize: 96}}>Scrolling down</Text>
//     <Image source={logo} />
//     <Image source={logo} />
//     <Image source={logo} />
//     <Image source={logo} />
//     <Image source={logo} />
//     <Text style={{fontSize: 96}}>What's the best</Text>
//     <Image source={logo} />
//     <Image source={logo} />
//     <Image source={logo} />
//     <Image source={logo} />
//     <Image source={logo} />
  
//     <Text style={{fontSize: 80}}>React Native</Text>
//   </ScrollView>
//     </View> */}
//     </View>
    
//   );
// };

// export default example;
