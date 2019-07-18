
const form = document.querySelector('#donor-form')

// FOR DONORS.EJS
var addDonor = document.querySelector('#add-donor')
firebase.firestore().collection('donors').onSnapshot(snapshot => {
    let changesDonor = snapshot.docChanges();
    changesDonor.forEach(changeDonor => {
        if (changeDonor.type == 'added') {
            createDonor(changeDonor.doc)
        }
        else if (changeDonor.type == 'removed') {
            let li2 = addDonor.querySelector('[data-id=' + changeDonor.doc.id + ']');
            addDonor.removeChild(li2);
        }
    })
});

function createDonor(doc) {
    addDonor.innerHTML = addDonor.innerHTML + `<div class="col s12 m6 l4">
<div class="card hoverable donor-card z-depth-2">
    <div class="card-content">
        <span class="card-title red-text text-darken-2 donor-name">${doc.data().name}</span>
        <p class="divider"></p><br>
        <span class="donor-contact">Contact: ${doc.data().contact}</span><br>
        <span class="donor-amount">Amount: ${doc.data().amount}</span><br>
    </div>
</div>
</div>`
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (form.number.value.length == 11) {
        firebase.firestore().collection('donors').add({
            name: form.name.value,
            contact: form.number.value,
            amount: form.amount.value,
        });
        form.reset()
    }
    else {
        alert("Enter Valid Number e.g (03xxxxxxxxx)");
    }
});