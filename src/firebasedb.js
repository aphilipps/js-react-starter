import firebase from 'firebase';
// import * as firebasedb from './firebasedb';

const config = {
  apiKey: 'AIzaSyAq-iaS-PMrdu2SVdT_AXqd4XmUG9QelO0',
  authDomain: 'lab3-react.firebaseapp.com',
  databaseURL: 'https://lab3-react.firebaseio.com',
  storageBucket: '',
};
firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database();


export function onNotesChanged(handleNotes) {
  database.ref('notes').on('value', (snapshot) => {
    handleNotes(snapshot.val());
  });
}

export function deleteNote(id) {
  database.ref('notes').child(id)
  .remove();
}

export function createNote(note) {
  firebase.database().ref('notes')
  .push(note);
}

export function updateNote(id, fields) {
  // Get a key for a new Post.
  firebase.database().ref('notes').child(id)
  .update(fields);
}
