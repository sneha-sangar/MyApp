import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [userName, setUserName] = useState('');
  const user = auth().currentUser;

  const fetchData = async () => {
    try {
      const snapshot = await firestore().collection('items').get();
      const itemsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(itemsList);
    } catch (error) {
      console.error(error);
    }
  };

  const createItem = async () => {
    if (itemName && itemQuantity) {
      try {
        await firestore().collection('items').add({
          name: itemName,
          quantity: parseInt(itemQuantity),
        });
        fetchData();
        setItemName('');
        setItemQuantity('');
      } catch (error) {
        console.error(error);
      }
    } else {
      Alert.alert('Validation', 'Please fill out all fields.');
    }
  };

  const updateItem = async () => {
    if (itemName && itemQuantity && currentId) {
      try {
        await firestore().collection('items').doc(currentId).update({
          name: itemName,
          quantity: parseInt(itemQuantity),
        });
        fetchData();
        setItemName('');
        setItemQuantity('');
        setIsUpdating(false);
        setCurrentId(null);
      } catch (error) {
        console.error(error);
      }
    } else {
      Alert.alert('Validation', 'Please fill out all fields.');
    }
  };

  const deleteItem = async id => {
    try {
      await firestore().collection('items').doc(id).delete();
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  // const handleLogout = () => {
  //   auth()
  //     .signOut()
  //     .then(() => {
  //       navigation.replace('Login');
  //     });
  // };

  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        const doc = await firestore().collection('users').doc(user.uid).get();
        if (doc.exists) {
          setUserName(doc.data().name);
        }
      }
    };

    fetchData();
    fetchUserName();
  }, []);

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity> */}
      <Text style={styles.welcome}>Welcome, {userName || 'User'}</Text>



      <Text style={styles.header}>{isUpdating ? 'Update Item' : 'Create Item'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Item Name"
          placeholderTextColor="black"
        value={itemName}
        onChangeText={setItemName}
      />
      <TextInput
        style={styles.input}
        placeholder="Item Quantity"
        keyboardType="numeric"
          placeholderTextColor="black"
        value={itemQuantity}
        onChangeText={setItemQuantity}
      />

      <TouchableOpacity
        style={styles.actionButton}
        onPress={isUpdating ? updateItem : createItem}>
        <Text style={styles.actionButtonText}>
          {isUpdating ? 'Update' : 'Create'}
        </Text>
      </TouchableOpacity>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Item Name</Text>
          <Text style={styles.tableHeaderText}>Quantity</Text>
          <Text style={styles.tableHeaderText}>Actions</Text>
        </View>

        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.name}</Text>
              <Text style={styles.tableCell}>{item.quantity}</Text>
              <View style={styles.tableActions}>
                <TouchableOpacity
                  onPress={() => {
                    setItemName(item.name);
                    setItemQuantity(item.quantity.toString());
                    setCurrentId(item.id);
                    setIsUpdating(true);
                  }}>
                  <FontAwesome name="edit" size={24} color="#f5a623" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteItem(item.id)}>
                  <Feather name="trash-2" size={20} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    paddingTop: 40,
  },
  welcome: {
    fontSize: 22,
    marginBottom: 10,
    color: '#1DC9b7',
    fontWeight: '600',
    textAlign: 'center',
  },
  // logoutButton: {
  //   alignSelf: 'flex-end',
  //   marginBottom: 10,
  // },
  logoutText: {
    color: '#1DC9b7',
    fontWeight: '600',
    fontSize: 16,
  },
  header: {
    fontSize: 20,
    marginBottom: 15,
    color: '#1DC9b7',
    fontWeight: '600',
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
    color:'#000'
  },
  actionButton: {
    backgroundColor: '#1DC9b7',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1DC9b7',
    padding: 10,
    justifyContent: 'space-between',
  },
  tableHeaderText: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent:'center'
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
  tableActions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 60,
  },
});

export default HomeScreen;
