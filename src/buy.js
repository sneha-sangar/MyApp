import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
// If needed, import fallback local image
// import shampoo from '../assets/shampoo.png';

const CheckoutScreen = ({ route }) => {
  const { item,orderId } = route.params;
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [coupon, setCoupon] = useState('');
  const navigation = useNavigation(); 
  const handleContinue = async () => {
    if (!address.trim()) {
      Alert.alert('Please enter an address');
      return;
    }

    try {
      await firestore()
        .collection('Orders')
        .doc(item.id)  
        .update({ address });  

      Alert.alert('Address added successfully');
      navigation.goBack();  
    } catch (error) {
      console.error('Error updating address:', error);
      Alert.alert('Failed to update address');
    }
  };




  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      {loading && <ActivityIndicator size="large" color="#1DC9b7" style={styles.loader} />}

      <Image
        source={item.image ? { uri: item.image } : null}
        style={styles.image}
        resizeMode="contain"
        onLoadEnd={() => setLoading(false)}
      />

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Product:</Text>
        <Text style={styles.value}>{item.title}</Text>

        <Text style={styles.label}>Price:</Text>
        <Text style={styles.value}>${item.price}</Text>

        <Text style={styles.label}>Quantity:</Text>
        <Text style={styles.value}>{item.quantity}</Text>

        <Text style={styles.label}>Shipping Address:</Text>
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
        {/* <TextInput
          style={styles.input}
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          style={styles.input}
          placeholder="ZIP Code"
          value={zip}
          onChangeText={setZip}
          keyboardType="number-pad"
        /> */}

        <Text style={styles.label}>Coupon Code:</Text>
        <TextInput
          placeholder="Enter coupon code"
          style={styles.input}
          value={coupon}
          onChangeText={setCoupon}
        />

        <Text style={styles.total}>Total: ${item.price * item.quantity}</Text>

        <TouchableOpacity style={styles.buyButton} onPress={handleContinue}>
          <Text style={styles.buyButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F7F9FC',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  loader: {
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailsContainer: {
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    color: '#888',
    marginTop: 15,
  },
  value: {
    fontSize: 18,
    color: '#000',
    fontWeight: '500',
  },
  total: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1DC9b7',
    alignSelf: 'flex-end',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 5,
    backgroundColor: '#fff',
  },
  buyButton: {
    backgroundColor: '#1DC9b7',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 30,
    alignSelf: 'flex-end',
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
