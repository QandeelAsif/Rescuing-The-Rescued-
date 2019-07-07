console.log('hello')


var btns = document.getElementsByTagName("span")["more-info-span"];
var x = document.getElementsByClassName("more-info");
console.log(x.length)
for (i = 0; i < x.length; i++) {
    console.log((x.item(i).getAttribute("id")))
}
function checkId(firebaseId)
{
    // console.log(document.getElementsByTagName("span").item(5).getAttribute("id"))
    
    for(var i = 1 ; i < 6 ; i++) {
        if (document.getElementsByTagName("span").item(i).getAttribute("id") == firebaseId)
        console.log('hi' + firebaseId)
        else
        {
            console.log('bye')
        }

    }
}

  
// console.log(moreInfoBtns)
// var childName = document.querySelector('#data-child-name')
// var childAge = document.querySelector('#data-child-age')
// var childDob = document.querySelector('#data-child-dob')
// var childCity = document.querySelector('#data-child-city')
// var childDescription = document.querySelector('#data-child-description')
// childName.innerHTML = 
// childAge.innerHTML = 
// childDob.innerHTML = 
// childCity.innerHTML = 
// // childDescription.innerHTML = '';



firebase.firestore().collection('children').onSnapshot(snapshot => {
    let ids = snapshot.docChanges();
    ids.forEach(id => {
        if (id.type == 'added') {
            checkId(id.doc.id)
        }
    })
});

