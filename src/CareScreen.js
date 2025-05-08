import React, { useState } from 'react';
import {
  View, Text, TextInput, FlatList, Image,
  TouchableOpacity, StyleSheet, ScrollView, Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const shampoo = require('./Shampoo.png');

const categories = ['Baby & Kids', 'Body', 'Teeth & Mouth', 'Face'];

const products = [
  {
    id: '1',
    title: 'Baby diapers',
    brand: 'Pampers',
    size: 'Size - 2 (4–8 kg), 68 pcs',
    price: '$25',
    image: shampoo,
  },
  {
    id: '2',
    title: 'Wet wipes',
    brand: 'Huggies',
    size: '56 pcs',
    price: '$12',
    image: shampoo,
  },
  {
    id: '3',
    title: 'Gentle shampoo',
    brand: 'Mustela',
    size: '500 ml',
    price: '$28',
    image: shampoo,
  },
  {
    id: '4',
    title: 'Body Wash & Shampoo',
    brand: 'Weleda',
    size: '200 ml',
    price: '$23',
    image: shampoo,
  },
  {
    id: '5',
    title: 'Extra Care Diapers',
    brand: 'Huggies',
    size: '25 pcs',
    price: '$20',
    image: shampoo,
  },
  {
    id: '6',
    title: 'Healing Ointment',
    brand: 'Aquaphor',
    size: '',
    price: '$18',
    image: shampoo,
  },
];

const CareScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedProduct(item);
        setModalVisible(true);
      }}
      style={styles.card}
    >
      {item.image && <Image source={item.image} style={styles.image} />}
      <Text style={styles.brand}>{item.brand}</Text>
      <Text style={styles.title}>{item.title}</Text>
      {item.size ? <Text style={styles.size}>{item.size}</Text> : null}
      <View style={styles.bottomRow}>
        <Text style={styles.price}>{item.price}</Text>
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
        <Icon name='arrow-left' size={20} style={styles.icons} />
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
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
      />

      {/* Product Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
         animationType="slide"
        // animationType="fade"
        // presentationStyle='pagesheet'
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeIcon}>
  <Icon name="close" size={20} color="#007bff" />
</TouchableOpacity>
            <Text style={styles.modalTitle}>{selectedProduct?.title}</Text>
            
            <Image source={selectedProduct?.image} style={styles.modalImage} />
            <Text style={styles.modalBrand}>Brand: {selectedProduct?.brand}</Text>
            <Text style={styles.modalSize}>Size: {selectedProduct?.size || 'N/A'}</Text>
            <Text style={styles.modalPrice}>Price: {selectedProduct?.price}</Text>
            <TouchableOpacity  style={styles.closeBtn}>
              <Text style={{ color: '#fff', textAlign: 'center' }}>Add To Card</Text>
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
    marginHorizontal: 122,
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
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#e6eef3',
    borderRadius: 20,
    marginRight: 8,
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  modalBrand: {
    fontSize: 14,
    marginBottom: 4,
  },
  modalSize: {
    fontSize: 14,
    marginBottom: 4,
  },
  modalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeBtn: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    width: '100%',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    // backgroundColor: '#007bff',
    padding: 6,
    borderRadius: 20,
    zIndex: 1,
  },
  
});

export default CareScreen;
