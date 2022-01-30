import { async } from '@firebase/util'
import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    doc,
    collectionGroup,
    connectFirestoreEmulator,
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

function Firebase() {
    const firebase = async () => {
        const ordersSnapshot = await getDocs(collectionGroup(db, 'users'))
        const orders = ordersSnapshot.docs.map((doc) => doc.data())
        console.log(orders)
    }
    firebase()

    const firebase1 = async () => {
        // davidmoyce45@gmail.com
        const ordersCol = collection(db, 'users/davidmoyce45@gmail.com/orders')
        const orderDocs = await getDocs(ordersCol)
        const orders = orderDocs.docs.map((doc) => doc.data())
        console.log(orders)
    }
    firebase1()

    return (
        <div>
            <h1>Test Firebase</h1>
        </div>
    )
}

export default Firebase
