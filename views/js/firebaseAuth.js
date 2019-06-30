
//function to check if the user is logged in
function checkIfLoggedIn() {
    firebase.auth().onAuthStateChanged(function(user){
        if (user){
            console.log(user);
            document.getElementById('google-signin').setAttribute('style','display:none; visibility:hidden')
            document.getElementById('google-signout').setAttribute('style','display:inline-block; visibility:visible')
    }else{
       document.getElementById('google-signin').setAttribute('style','display:inline-block;visibility:visible')
       document.getElementById('google-signout').setAttribute('style','display:none;visibility:hidden') 
    }
    })
}

window.onload=function(){   
   
checkIfLoggedIn();
}


//function to sign out
function signOut(){
    firebase.auth().signOut()
    checkIfLoggedIn()
}

//function to log user in using goolge

function signInWithGoogle() {
    var googleAuthProvider = new firebase.auth.GoogleAuthProvider
    firebase.auth().signInWithPopup(googleAuthProvider)
        .then(function (data ) {
            console.log(data)
            var idToken=data.credential.idToken;
            localStorage.setItem('firebase_idToken',idToken );

            checkIfLoggedIn(); 
        })
        .catch(function (err) { 
            console.log(error)
        })
}
