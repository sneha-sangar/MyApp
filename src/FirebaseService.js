// FirebaseService.js
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const signUp = async (email, password, name) => {
  try {
    // Create a new user in Firebase Authentication
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);

    // Save user data to Firestore
    await firestore().collection('users').doc(userCredential.user.uid).set({
      name,
      email: userCredential.user.email,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

    return userCredential;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const login = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const logout = () => {
  return auth().signOut();
};

export const onAuthStateChanged = (callback) => {
  return auth().onAuthStateChanged(callback);
};
