/**
* Created by justinqassis on 4/21/17.
*/
/* globals firebase */

var config = {
  apiKey: 'AIzaSyCql4QYioQ3J-ZOd7YeZG2zPJpV8yvaOMM',
  authDomain: 'secret-santa-3c7c7.firebaseapp.com',
  databaseURL: 'https://secret-santa-3c7c7.firebaseio.com',
  projectId: 'secret-santa-3c7c7',
  storageBucket: 'secret-santa-3c7c7.appspot.com',
  messagingSenderId: '793554451571'
}
firebase.initializeApp(config)
var nameInput = document.getElementById('nameInput')
var prediction = document.getElementById('prediction')
var submit = document.getElementById('submitButton')

function newPrediction () {
  firebase.database().ref('predictions').push({
    name: nameInput.value,
    prediction: prediction.value,
    date: new Date().getTime()
  })
}
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    document.getElementById('displayName').textContent = user.displayName
    document.getElementById('signedIn').style.display = 'block'
    document.getElementById('signInForm').style.display = 'none'
    document.getElementById('signOut').style.display = 'block'
    document.getElementById('signUpForm').style.display = 'none'
    var newPredictions = document.getElementById('predictions')
    submit.addEventListener('click', newPrediction)
    firebase.database().ref('predictions').on('child_added', function (predictionSnapshot) {
      var result = predictionSnapshot.val()
      newPredictions.innerHTML = newPredictions.innerHTML + '<p>' + result.name + '</p>' + result.prediction + 
    })
  } else {
    document.getElementById('signedIn').style.display = 'none'
    document.getElementById('signInForm').style.display = 'block'
    document.getElementById('signOut').style.display = 'none'
  }
})
var signIn = document.getElementById('signInButton')
var email = document.getElementById('emailInput')
var pass = document.getElementById('passwordInput')
var signOut = document.getElementById('signOutButton')
var createAccount = document.getElementById('showSignUp')
var backToLogin = document.getElementById('showSignIn')
var signUp = document.getElementById('showSignIn')
var signUp = document.getElementById('signUpButton')
var userName = document.getElementById('newName')
var newEmail = document.getElementById('newEmail')
var newPassword = document.getElementById('newPassword')

signIn.addEventListener('click', function () {
  firebase.auth().signInWithEmailAndPassword(email.value, pass.value)
  .catch(function (error) {
    window.alert('Invalid credentials')
  })
})
signOut.addEventListener('click', function () {
  firebase.auth().signOut()
})
createAccount.addEventListener('click', function () {
  document.getElementById('signInForm').style.display = 'none'
  document.getElementById('signUpForm').style.display = 'block'
})
backToLogin.addEventListener('click', function () {
  document.getElementById('signUpForm').style.display = 'none'
  document.getElementById('signInForm').style.display = 'block'
})
signUp.addEventListener('click', function () {
  firebase.auth().createUserWithEmailAndPassword(newEmail.value, newPassword.value)
  .then(function (user) {
    user.updateProfile({
      displayName: userName.value
    }) .then(function () {
      document.getElementById('displayName').textContent = user.displayName
    })
  }).catch(function (error) {
    if (error.code === 'auth/email-already-in-use') {
      window.alert('unable to create user')
    } else {
      window.alert('unable to create user')
    }
  })
})
