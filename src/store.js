import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Configurar firestore.
const firebaseConfig = {
	apiKey: 'AIzaSyAX__d5fsWKwYkE_2UgqTb4gGkuVWZHIJk',
	authDomain: 'bibliostore-cfa6f.firebaseapp.com',
	databaseURL: 'https://bibliostore-cfa6f.firebaseio.com',
	projectId: 'bibliostore-cfa6f',
	storageBucket: 'bibliostore-cfa6f.appspot.com',
	messagingSenderId: '1010486545862',
	appId: '1:1010486545862:web:6f2f3317a4209033f3f6c7',
	measurementId: 'G-1C3KSEC7NK'
};

// Inicializar firebase
firebase.initializeApp(firebaseConfig);

// configuracion de react-redux
const rrfConfig = {
	userProfile: 'users',
	useFirestoreForProfile: true
};

// crear el enhacer con compose de redux y firestore
const createStoreWithFirebase = compose(reactReduxFirebase(firebase, rrfConfig), reduxFirestore(firebase))(createStore);

// Reducers
const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer
});

// state inicial
const initialState = {};

// Create el store
const store = createStoreWithFirebase(
	rootReducer,
	initialState,
	compose(reactReduxFirebase(firebase), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);
export default store;
