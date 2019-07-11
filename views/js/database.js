// FOR INDEX.EJS 
var addCase = document.querySelector('#child-cases-div')
var addDonor = document.querySelector('#add-donor')
function createCase(doc) {
    addCase.innerHTML = addCase.innerHTML + `<div class="col l4 m6 s12">
    <div class="card hoverable">
        <div class="card-image">
            <img src = "${doc.data().image}">
        </div>
        <div class="card-content">
            <span class="card-title">${doc.data().name}</span>
            <p class="divider"></p><br>
            <span class="" id="${doc.id}">
            <a href="/children/${doc.id}"  class="waves-effect waves-light btn red darken-2 more-info" onclick="">More Info</a>
            </span>
        </div>
    </div>
</div>`
}

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

