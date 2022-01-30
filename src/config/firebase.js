import { initializeApp } from 'firebase/app'

import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    doc,
    query,
    orderBy,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyChuW7gwZ27LStUqz6WLjZVoc6nhyeio5g',
    authDomain: 'clone-119f3.firebaseapp.com',
    projectId: 'clone-119f3',
    storageBucket: 'clone-119f3.appspot.com',
    messagingSenderId: '243010532678',
    appId: '1:243010532678:web:cfe90d87cc32d825d26147',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const getOrders = async (email) => {
    const orderQuery = query(
        collection(db, `users/${email}/orders`),
        orderBy('timestamp', 'desc')
    )
    const orderSnapshot = await getDocs(orderQuery)
    return orderSnapshot
}

export { db, getOrders }
