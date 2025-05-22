import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, FlatList, Image,
  TouchableOpacity, StyleSheet, ScrollView, Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';
// import { app } from './firebaseConfig';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useCart } from './CardContext'; // Import at the top
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
const shampoo = require('./Shampoo.png');

const categories = ['Baby & Kids', 'Body', 'Teeth & Mouth', 'Face'];

// const products = [
//   {
//     id: '1',
//     title: 'Baby diapers',
//     brand: 'Pampers',
//     size: 'Size - 2 (4–8 kg), 68 pcs',
//     price: '$25',
//     image: shampoo,
//   },
//   {
//     id: '2',
//     title: 'Wet wipes',
//     brand: 'Huggies',
//     size: '56 pcs',
//     price: '$12',
//     image: shampoo,
//   },
//   {
//     id: '3',
//     title: 'Gentle shampoo',
//     brand: 'Mustela',
//     size: '500 ml',
//     price: '$28',
//     image: shampoo,
//   },
//   {
//     id: '4',
//     title: 'Body Wash & Shampoo',
//     brand: 'Weleda',
//     size: '200 ml',
//     price: '$23',
//     image: shampoo,
//   },
//   {
//     id: '5',
//     title: 'Extra Care Diapers',
//     brand: 'Huggies',
//     size: '25 pcs',
//     price: '$20',
//     image: shampoo,
//   },
//   {
//     id: '6',
//     title: 'Healing Ointment',
//     brand: 'Aquaphor',
//     size: '',
//     price: '$18',
//     image: shampoo,
//   },
//   {
//   id: '7',
//   title: 'Healing Ointment',
//   brand: 'Aquaphor',
//   size: '',
//   price: '$18',
//   image: shampoo,
// },
//   {
//   id: '9',
//   title: 'Healing Ointment',
//   brand: 'Aquaphor',
//   size: '',
//   price: '$18',
//   image: shampoo,
// },
// ];

const CareScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
const [quantity, setQuantity] = useState(1);

  const navigation=useNavigation();
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await firestore().collection('Product').get();
        const productList = [];
        querySnapshot.forEach(doc => {
          productList.push({ id: doc.id, ...doc.data() });
        });
        console.log("Fetched products:", productList);
        setProducts(productList);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);
const handleAddToCart = async () => {
  if (!selectedProduct) return;

  const user = auth().currentUser;

  const order = {
    productId: selectedProduct.id,
    title: selectedProduct.title,
    brand: selectedProduct.brand,
    size: selectedProduct.size || '',
    price: selectedProduct.price,
    image: selectedProduct.image || 'https://via.placeholder.com/150',
    status: 'pending',
      quantity,
    createdAt: firestore.FieldValue.serverTimestamp(),
  };

  try {
    if (user) {
      const snapshot = await firestore()
        .collection('Orders')
        .where('userId', '==', user.uid)
        .where('productId', '==', selectedProduct.id)
        .get();

      if (!snapshot.empty) {
        alert('You already added this item to your cart');
        return;
      }

      await firestore().collection('Orders').add({
        ...order,
        userId: user.uid,
      });
      alert('Product added to cart');
    } else {
      const existing = await AsyncStorage.getItem('localCart');
      const localCart = existing ? JSON.parse(existing) : [];

      const alreadyExists = localCart.some(
        (item) => item.productId === selectedProduct.id
      );

      if (alreadyExists) {
        alert('You already added this item to your cart');
        return;
      }

      localCart.push(order);
      await AsyncStorage.setItem('localCart', JSON.stringify(localCart));
      alert('Product added to cart (Local)');
    }

    setModalVisible(false);
  } catch (error) {
    console.error('Error adding to cart:', error);
    alert('Failed to add to cart');
  }
      addToCart(cartItem); // ✅ update context

};
const incrementQuantity = () => setQuantity(prev => prev + 1);
const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));


  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
  console.log("Card Pressed", item);
  setSelectedProduct(item);
   setQuantity(1);
  setModalVisible(true);
}}

      style={styles.card}
    >
    <Image
  source={item.image ? { uri: item.image } : shampoo}
  style={styles.image}
/>


      <Text style={styles.brand}>{item.brand}</Text>
      <Text style={styles.title}>{item.title}</Text>
      {item.size ? <Text style={styles.size}>{item.size}</Text> : null}
      <View style={styles.bottomRow}>
        <Text style={styles.price}>${item.price}</Text>
        <TouchableOpacity style={styles.cartBtn}>
          <Icon name="shopping-cart" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
        <Icon name='arrow-left' size={20} style={styles.icons} />
        </TouchableOpacity>
      
        <Icon name="heartbeat" size={30} color="red" style={styles.icons} />
        <Icon name="bars" size={20} style={styles.icons} />
      </View>

      {/* Search */}
      <TextInput style={styles.search} placeholder="Search" />

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
        {categories.map(cat => (
          <TouchableOpacity key={cat} style={styles.categoryBtn}>
            <Text style={styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Product List */}
      {loading ? (
        <Text>Loading products...</Text>
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
        />
      )}

      {/* Product Modal */}
     <Modal
  key={selectedProduct?.id}
  visible={modalVisible}
  transparent={true}
  animationType="slide"
  
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeIcon}>
        <Icon name="close" size={20} color="#007bff" />
      </TouchableOpacity>
      <Text style={styles.modalTitle}>{selectedProduct?.title}</Text>
      <Image
        source={
          selectedProduct?.image && typeof selectedProduct.image === 'string'
            ? { uri: selectedProduct.image }
            : shampoo
        }
        style={styles.image}
      />
      <Text style={styles.modalBrand}>Brand: {selectedProduct?.brand}</Text>
      <Text style={styles.modalSize}>Size: {selectedProduct?.size || 'N/A'}</Text>
      <Text style={styles.modalPrice}>Price: ${selectedProduct?.price}</Text>

      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.quantityBtn} onPress={decrementQuantity}>
          <Text style={styles.quantityBtnText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.quantityText}>{quantity}</Text>

        <TouchableOpacity style={styles.quantityBtn} onPress={incrementQuantity}>
          <Text style={styles.quantityBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.closeBtn} onPress={handleAddToCart}>
        <Text style={{ color: '#fff', textAlign: 'center' }}>Add To Cart</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

    </View>
  );
};

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    backgroundColor: '#f6fbfd',
    paddingHorizontal: 6
  },
  header: {
    flexDirection: 'row',
    alignItems: "center",
    marginVertical: 20,
    marginTop: 40,
  },
  icons: {
    marginHorizontal: 142,
    marginLeft: 10
  },
  search: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
  categories: { marginBottom: 16 },
  categoryBtn: {
    paddingHorizontal: 18,
    paddingVertical: 2,
    backgroundColor: '#e6eef3',
    borderRadius: 20,
    marginRight: 8,
    textAlign: 'center',
    justifyContent: 'center'
  },
  categoryText: {
    fontSize: 14,
    color: '#555',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    margin: 6,
    flex: 1,
    maxWidth: '48%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain'
  },
  brand: {
    fontSize: 13,
    color: '#777',
    marginTop: 5
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14
  },
  size: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4
  },
  price: {
    fontSize: 16,
    fontWeight: '700'
  },
  cartBtn: {
    backgroundColor: '#007bff',
    padding: 6,
    borderRadius: 6,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  padding: 20,
},

modalContent: {
  width: '90%',
  backgroundColor: '#fff',
  borderRadius: 20,
  padding: 20,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},

closeIcon: {
  alignSelf: 'flex-end',
  marginBottom: 10,
},

modalTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 10,
  textAlign: 'center',
  color: '#333',
},

modalBrand: {
  fontSize: 16,
  color: '#666',
  marginBottom: 4,
},

modalSize: {
  fontSize: 16,
  color: '#666',
  marginBottom: 4,
},

modalPrice: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#1dc9b7',
  marginBottom: 10,
},

quantityContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: 10,
},

quantityBtn: {
  // backgroundColor: '#1dc9b7',
  borderRadius: 5,
  paddingHorizontal: 10,
  paddingVertical: 5,
  marginHorizontal: 10,
},

quantityBtnText: {
  color: 'black',
  fontSize: 18,
  fontWeight: 'bold',
},

quantityText: {
  fontSize: 16,
  color: '#333',
  fontWeight: '500',
},

closeBtn: {
  backgroundColor: '#1dc9b7',
  paddingVertical: 12,
  paddingHorizontal: 30,
  borderRadius: 10,
  marginTop: 15,
  width: '100%',
},


});

export default CareScreen; 