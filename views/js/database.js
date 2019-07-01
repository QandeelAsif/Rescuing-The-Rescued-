var i = 0;
var addCase = document.querySelector('#child-cases-div')
var caseForm = document.querySelector('#case-form')
// var caseDetails = document.querySelector('#data-wrapper')
var childName = document.querySelector('#data-child-name')
var childAage = document.querySelector('#data-child-age')
var childDob = document.querySelector('#data-child-dob')
var childCity = document.querySelector('#data-child-city')
var childDescription = document.querySelector('#data-child-description')

// childAge.innerHTML = `${doc.data().age}`
// childDob.innerHTML = `${doc.data().dob}`
// childCity.innerHTML = `${doc.data().city}`
// childFescription.innerHTML = `${doc.data().description}`
function createCase(doc) {
    console.log(doc.id)
    i++;
    addCase.innerHTML = addCase.innerHTML + `<div class="col l4 m6 s12">
    <div class="card hoverable">
        <div class="card-image">
            <img src="images/data1.jpg">
        </div>
        <div class="card-content">
            <span class="card-title">${doc.data().name}</span>
            <p class="divider"></p><br>
            <a href="/show" class="waves-effect waves-light btn red darken-2" id="more-info ">More Info</a>
        </div>
    </div>
</div>`


}

//saving data
caseForm.addEventListener('submit',(e) => {
    e.preventDefault();
        firebase.firestore().collection('children').add({
            name: caseForm.name.value,
            age : caseForm.age.value,
            dob : caseForm.dob.value,
            city : caseForm.city.value,
            description : caseForm.description.value,
        });
        caseForm.reset()
});

firebase.firestore().collection('children').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == 'added') {
            createCase(change.doc)
        }
        else if (change.type == 'removed') {
            let li = addCase.querySelector('[data-id=' + change.doc.id + ']');
            addCase.removeChild(li);
        }
    })
});