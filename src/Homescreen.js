import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
// const Tab = createBottomTabNavigator();
// function Tabs() {
//   return (
//     <Tab.Navigator>
// <Tab.Screen
//   name="Home"
//   component={HomeScreen}
//   options={{
//     tabBarIcon: ({ color, size }) => (
//       <Icon name="home-outline" size={size} color={color} />
//     ),
//   }}
// />

//       <Tab.Screen name="Shop" component={HomeScreen} />
//       <Tab.Screen name="profile" component={HomeScreen} />
//       <Tab.Screen name="Favorites" component={HomeScreen} />
//     </Tab.Navigator>
//   );
// }

const categories = [
  { name: 'Medical', icon: 'briefcase-medical', type: 'fontawesome5' },
  { name: 'Heart', icon: 'heartbeat', type: 'fontawesome5' },
  { name: 'Brain', icon: 'brain', type: 'fontawesome5' },
  { name: 'Stomach', icon: 'utensils', type: 'fontawesome5' },
  { name: 'Lungs', icon: 'lungs', type: 'fontawesome5' },
];



const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>Pharma<Text style={{ color: '#4f9df7' }}>Mate</Text></Text>
          <Icon name="notifications-outline" size={24} color="#333" />
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <Icon name="search-outline" size={20} color="#aaa" />
          <TextInput placeholder="Search" style={styles.input} />
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <Swiper autoplay showsPagination={true} style={styles.swiper}>
            <View style={styles.slide}>
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2927/2927533.png' }}
                style={styles.bannerImage}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2927/2927506.png' }}
                style={styles.bannerImage}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2927/2927559.png' }}
                style={styles.bannerImage}
              />
            </View>
          </Swiper>
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
  {categories.map((cat, index) => (
    <TouchableOpacity
      key={index}
      style={styles.categoryItem}
      onPress={() => navigation.navigate('Care')}
    >
      <View style={styles.categoryIcon}>
        {cat.type === 'fontawesome5' ? (
          <FontAwesome5 name={cat.icon} size={24} color="#000" />
        ) : (
          <Icon name={cat.icon} size={24} color="#000" />
        )}
      </View>
      <Text style={styles.categoryText}>{cat.name}</Text>
    </TouchableOpacity>
  ))}
</ScrollView>

        {/* Popular */}
        <Text style={styles.sectionTitle}>Popular</Text>
        <View style={styles.popular}>
          <View style={styles.productCard}>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2927/2927559.png' }}
              style={{ width: 100, height: 100 }}
            />
            <Text style={styles.productTitle}>Baby diapers</Text>
            <Text style={styles.productSubtitle}>Size - 2 (4-8 kg), 68 pcs</Text>
          </View>
          <View style={styles.productCard}>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2927/2927559.png' }}
              style={{ width: 100, height: 100 }}
            />
            <Text style={styles.productTitle}>Omega-3</Text>
            <Text style={styles.productSubtitle}>30 softgels</Text>
          </View>
          
        </View>
     

      {/* Bottom Navigation Bar */}
      {/* <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Icon name="home" size={24} color="#777" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="heart-outline" size={24} color="#777" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome5 name="shopping-cart" size={22} color="#777" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="person-outline" size={24} color="#777" />
        </TouchableOpacity>
      </View> */}
  

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#e6f2ff',
  },
  container: {
    padding: 10,
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    marginVertical: 16,
  },
  input: {
    marginLeft: 10,
    flex: 1,
    color: 'black',
  },
  banner: {
    backgroundColor: '#cce5ff',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  swiper: {
    height: 150,
    borderRadius: 12,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  categories: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  categoryIcon: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 12,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 14,
  },
  popular: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    width: '48%',
  },
  productTitle: {
    fontWeight: 'bold',
    marginTop: 8,
  },
  productSubtitle: {
    color: '#777',
    fontSize: 12,
  },
  // bottomNav: {
  //   flexDirection: 'row',
  //   height:70,
  //   justifyContent: 'space-around',
  //   paddingVertical: 12,
  //   backgroundColor: '#fff',
  //   borderTopLeftRadius: 20,
  //   borderTopRightRadius: 20,
  //   shadowColor: '#000',
  //   shadowOpacity: 0.1,
  //   shadowOffset: { width: 0, height: -6 },
  //   elevation: 10,
  //   marginTop:30,
  // },
});

export default HomeScreen;
