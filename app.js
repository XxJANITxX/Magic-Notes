console.log(" We are in app.js")
showNotes();

// If user adds a note , add it to the local storage 
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");

    let notesObj;
    // Checking whether notes are present in local storage or not  
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        // If no notes are present , we are initiating notesObj to empty array
        notesObj = [];
    } else {
        // If present , then we are restoring the array present in local storage
        notesObj = JSON.parse(notes);
    }

    // Adding new note to the array
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    //console.log(notesObj);
    showNotes();
});


// Displaying notes added in website 
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        // If no notes are present , we are initiating notesObj to empty array
        notesObj = [];
    } else {
        // If present , then we are restoring the array present in local storage
        notesObj = JSON.parse(notes);
    }

    // Creating HTML string
    let html = "";
    // Using for each loop to add all notes  
    notesObj.forEach(function (element, index) {
        html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
            <p class="card-text">${element}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Node</button>
        </div>
    </div>`;
    });

    // Checking whether the id="notes" div container is empty or not
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        // If not empty , put html to the innerhtml of notes 
        notesElm.innerHTML = html;
    } else {
        // else put this statement
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}


// function to delete a note
function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        // If no notes are present , we are initiating notesObj to empty array
        notesObj = [];
    } else {
        // If present , then we are restoring the array present in local storage
        notesObj = JSON.parse(notes);
    }

    // Deleting node from notesObj
    notesObj.splice(index, 1);
    // Setting it to local Storage
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}


// Making search txt for notes 
search = document.getElementById("searchTxt");
// Input event listener shoots whenever someone type in text box
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    //console.log("Input event fired ",inputVal);
    //Getting notecards from document
    let noteCards = document.getElementsByClassName("noteCard");
    // Displaying required node card only
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
});

// further features to create:
// 1. Add Title
// 2. Mark important
// 3. Seperate notes by user
// 4. Sync and host to web server