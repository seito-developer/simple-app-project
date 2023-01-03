// import * as firebase from "firebase/app";
import firebase from 'firebase/compat/app';
// import { getFirestore } from "firebase/firestore";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

export function dbOperation(){
    // TODO: Replace the following with your app's Firebase project configuration
    // See: https://firebase.google.com/docs/web/learn-more#config-object
    const firebaseConfig = {
        apiKey: "AIzaSyCeiAgerHoiqBMmJQyIwWTlaQIHs3VJfRM",
        authDomain: "db-test-6a682.firebaseapp.com",
        projectId: "db-test-6a682",
        storageBucket: "db-test-6a682.appspot.com",
        messagingSenderId: "747176992339",
        appId: "1:747176992339:web:2b886d51f1151a8a2ab0a6",
        measurementId: "G-S8L5L31DJY"
    };
    
    const firebaseApp = firebase.initializeApp(firebaseConfig);
    const db = getFirestore(firebaseApp);

    const showData = () => {
        const getData = async () => {
            const q = query(collection(db, "users"));

            const querySnapshot = await getDocs(q);
            const $table = document.getElementById('js-firebase-table');

            querySnapshot.forEach((doc, i) => {
                
                const tagTr = document.createElement('tr');

                const createTableRow = () => {
                    const tagTd1 = document.createElement('td');
                    tagTd1.textContent = doc.data().first;

                    const tagTd2 = document.createElement('td');
                    tagTd2.textContent = doc.data().last;

                    const tagTd3 = document.createElement('td');
                    tagTd3.textContent = doc.data().born;

                    tagTr.insertAdjacentElement('afterbegin', tagTd1);
                    tagTr.insertAdjacentElement('afterbegin', tagTd2);
                    tagTr.insertAdjacentElement('afterbegin', tagTd3);
                    
                    $table.insertAdjacentElement('afterbegin', tagTr);
                }
                createTableRow()
            });
        }
        getData();
    }
    showData();

    const insertNewUser = (params) => {
        // Initialize Cloud Firestore and get a reference to the service
        
        db.collection("users").add({
            first: params.first,
            last: params.last,
            born: params.born
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }

    // insertNewUser
    const formController = () => {
        const $form = document.getElementById('js-form');

        const handleClick = (e) => {
            e.preventDefault();
            const data = {
                first: $form.querySelector('input[name=first]').value,
                last: $form.querySelector('input[name=last]').value,
                born: $form.querySelector('input[name=born]').value
            }
            console.log('data:', data);
            insertNewUser(data);
        }
        
        $form.addEventListener('submit', (e) => handleClick(e));
    }
    formController();
}