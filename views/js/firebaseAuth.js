window.onload = function () {
    checkIfLoggedIn();
}
const signupForm = document.querySelector('#signup-form')
signupForm.addEventListener('click', (e) => {
    e.preventDefault();
    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {
        const modal = document.querySelector('#modal-register')
        M.Modal.getInstance(modal).close()
        signupForm.reset()
    }).catch(err =>
        signupForm.querySelector(".errorSignup").innerHTML = err.message
    )
});
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(cred => {
        loginForm.reset();
    }).catch(err => {
        loginForm.querySelector('.errorLogin').innerHTML = err.message;

    })
});

//signup

// //logout
const logout = document.querySelector('.logout');
logout.addEventListener('click', (e) => {
    auth.signOut().then(function () {
        window.location = "signup.html"
        console.log('hello')
    });
});

// firebase.auth().onAuthStateChanged(function (user) {
//     if (user) {
//         // User is signed in.
//         window.location = "donote.html"
//         console.log("User Signed In")
//     }
// });
//function to check if the user is logged in
function checkIfLoggedIn() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user);
            document.getElementById('sign-in-stuff').setAttribute('style', 'display:none;visibility:hidden')
            document.getElementById('sign-out-stuff').setAttribute('style', 'display:block;visibility:visible')

        } else {
            document.getElementById('sign-in-stuff').setAttribute('style', 'display:block;visibility:visible')
            document.getElementById('sign-out-stuff').setAttribute('style', 'display:none;visibility:hidden')
        }
    })
}

//function to sign out
function signOut() {
    firebase.auth().signOut()
    checkIfLoggedIn()
}

//function to log user in using goolge

function signInWithGoogle() {
    var googleAuthProvider = new firebase.auth.GoogleAuthProvider
    firebase.auth().signInWithPopup(googleAuthProvider)
        .then(function (data) {
            console.log(data)
            var idToken = data.credential.idToken;
            localStorage.setItem('firebase_idToken', idToken);
            checkIfLoggedIn();
        })
        .catch(function (err) {
            console.log(error)
        })
}
function donorCheck() {
    var donateBtn = document.querySelector('.donate-btn')
    donateBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (user) {
            window.location('/login')
        }
        else {
            window.localStorage('/donors')
        }
    })
}