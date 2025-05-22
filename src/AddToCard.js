import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,TextInput,Button
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useCart} from './CartContext';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
const [modalVisible, setModalVisible] = useState(false);
const [editingItem, setEditingItem] = useState(null);
const [editedQuantity, setEditedQuantity] = useState('');
 const { cartCount, updateCartCount } = useCart();
 const navigation = useNavigation();

//  const { updateCartCount } = useCart();
  useEffect(() => {
    const loadCart = async () => {
      const user = auth().currentUser;

      if (user) {
        const snapshot = await firestore()
          .collection('Orders')
          .where('userId', '==', user.uid)
          .get();

        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('Cart Items from Firebase:', items); 
        setCartItems(items);
      } else {
        const stored = await AsyncStorage.getItem('localCart');
        const parsed = stored ? JSON.parse(stored) : [];
        console.log('Cart Items from local storage:', parsed); 
        setCartItems(parsed);
      }
    };

    loadCart();
  }, []);

  const calculateTotal = () => {
  return cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
};
const handleBuyAll = () => {
  if (cartItems.length === 0) {
    Alert.alert('Cart is empty');
    return;
  }
  const totalPrice = calculateTotal();
  navigation.navigate('CheckoutScreen', { items: cartItems, totalPrice });

};

const confirmDelete = async (id) => {
    try {
      const user = auth().currentUser;

      if (user) {
        await firestore().collection('Orders').doc(id).delete();
        setCartItems(prev => prev.filter(item => item.id !== id));
      } else {
        const stored = await AsyncStorage.getItem('localCart');
        const parsed = stored ? JSON.parse(stored) : [];
        const updatedCart = parsed.filter(item => item.id !== id);
        await AsyncStorage.setItem('localCart', JSON.stringify(updatedCart));
        setCartItems(updatedCart);
      }

      // 🔥 Call this to update the tab badge
      updateCartCount();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
const openEditModal = (item) => {
  setEditingItem(item);
  setEditedQuantity(item.quantity?.toString() || '');
  setModalVisible(true);
};
const saveEdits = async () => {
  try {
    const updatedQuantity = parseInt(editedQuantity, 10);
    if (!updatedQuantity || updatedQuantity < 1) {
      Alert.alert('Invalid Quantity', 'Quantity must be a positive number.');
      return;
    }

    const user = auth().currentUser;

    if (user) {
      await firestore()
        .collection('Orders')
        .doc(editingItem.id)
        .update({ quantity: updatedQuantity });
    } else {
      const stored = await AsyncStorage.getItem('localCart');
      const parsed = stored ? JSON.parse(stored) : [];
      const updatedCart = parsed.map(item =>
        item.id === editingItem.id ? { ...item, quantity: updatedQuantity } : item
      );
      await AsyncStorage.setItem('localCart', JSON.stringify(updatedCart));
    }

    setCartItems(prev =>
      prev.map(item =>
        item.id === editingItem.id ? { ...item, quantity: updatedQuantity } : item
      )
    );

    setModalVisible(false);
    setEditingItem(null);
  } catch (error) {
    console.error('Error updating item:', error);
  }
};
const handleBuy = (item) => {
  navigation.navigate('CheckoutScreen', { item });
};



const renderItem = ({ item }) => (
  <View style={styles.card}>
    <Image
      source={item.image ? { uri: item.image } : shampoo}
      style={styles.image}
    />
    <View style={styles.iconRow}>
        <TouchableOpacity onPress={() => openEditModal(item)} style={styles.iconButton}>
          <Icon name="edit" size={20} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => confirmDelete(item.id)} style={styles.iconButton}>
          <Icon name="delete" size={20} color="#ff4d4d" />
        </TouchableOpacity>
      </View>
    <View style={styles.textContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.brand}>{item.brand}</Text>
      {item.size ? <Text style={styles.size}>{item.size}</Text> : null}
 <Text >Price: ${item.price}</Text>
<Text style={styles.quantity}>Quantity: {item.quantity}</Text>
<Text style={styles.price}>Total: ${item.price * item.quantity}</Text>
<TouchableOpacity style={styles.buyButton} onPress={() => handleBuy(item)}>
  <Text style={styles.buyButtonText}>Buy</Text>
</TouchableOpacity>
{/* <Button title="Buy"  style={styles.buyButton} onPress={() => handleBuy(item)} /> */}


     


    </View>
  </View>
);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId || item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <View style={styles.footer}>
  <Text style={styles.totalText}>Total Price: ${calculateTotal().toFixed(2)}</Text>
  <TouchableOpacity style={styles.buyAllButton} onPress={() => handleBuyAll()}>
    <Text style={styles.buyAllButtonText}>Buy All</Text>
  </TouchableOpacity>
</View>

      {modalVisible && (
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Edit Quantity</Text>
      <TextInput
        value={editedQuantity}
        onChangeText={setEditedQuantity}
        keyboardType="numeric"
        style={styles.input}
        placeholder="Enter new quantity"
      />
      <View style={styles.modalButtons}>
        <TouchableOpacity onPress={saveEdits} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
)}

    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  list: {
    paddingBottom: 20,
  },
 card: {
  flexDirection: 'row', 
  backgroundColor: '#fff',
  borderRadius: 8,
  padding: 16,
  marginBottom: 12,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: 1 },
  shadowRadius: 4,
  elevation: 2,
  // alignItems: 'center', // optional: center the content horizontally
},
 title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0c8b8b',
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    color: '#6c6c6c',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'cover',
  },
deleteButton: {
  marginTop: 10,
  backgroundColor: '#ff4d4d',
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 4,
  alignSelf: 'flex-start',
},
deleteButtonText: {
  color: '#fff',
  fontWeight: 'bold',
},
textContainer: {
  flex: 1,
  marginLeft: 12,
},editButton: {
  marginTop: 8,
  backgroundColor: '#4CAF50',
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 4,
  alignSelf: 'flex-start',
},
editButtonText: {
  color: '#fff',
  fontWeight: 'bold',
},
modalContainer: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},
modalContent: {
  backgroundColor: '#fff',
  padding: 20,
  borderRadius: 8,
  width: '80%',
},
modalTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
},
input: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 4,
  padding: 10,
  marginBottom: 10,
},
modalButtons: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},
saveButton: {
  backgroundColor: 'blue',
  padding: 10,
  borderRadius: 4,
  flex: 1,
  marginRight: 5,
  borderRadius:16
},
cancelButton: {
  backgroundColor: '#f44336',
  padding: 10,
  borderRadius: 4,
  flex: 1,
  marginLeft: 5,
    borderRadius:16
},
saveButtonText: {
  color: '#fff',
  textAlign: 'center',
  fontWeight: 'bold',
},
cancelButtonText: {
  color: '#fff',
  textAlign: 'center',
  fontWeight: 'bold',
},

iconRow: {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  position: 'absolute',
  top: 10,
  right: 10,
  zIndex: 1,
},

iconButton: {
  marginLeft: 10,
},
buyButton: {
  backgroundColor: '#1dc9b7',
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 8,
  marginTop: 10,
  alignSelf: 'flex-start',
},
buyButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
  textAlign: 'center',
},
footer: {
  padding: 16,
  backgroundColor: '#fff',
  borderTopWidth: 1,
  borderColor: '#ccc',
},
totalText: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
  color: '#333',
},
buyAllButton: {
  backgroundColor: '#1dc9b7',
  paddingVertical: 12,
  borderRadius: 8,
  alignItems: 'center',
},
buyAllButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},

});
