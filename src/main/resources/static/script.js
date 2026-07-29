const API_URL = "http://localhost:8081/notes";

let editingId = null;
let allNotes = [];

const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const saveBtn = document.getElementById("saveBtn");
const notesContainer = document.getElementById("notesContainer");
const totalNotes = document.getElementById("totalNotes");
const editingStatus = document.getElementById("editingStatus");
const todayDate = document.getElementById("todayDate");
const searchInput = document.getElementById("searchInput");
const themeToggle = document.getElementById("themeToggle");
const toast = document.getElementById("toast");
const loader = document.getElementById("loader");

/* ==========================
        INITIALIZE
========================== */

window.onload = () => {

    todayDate.innerText = new Date().toLocaleDateString();

    loadTheme();

    loadNotes();

};

/* ==========================
        LOADER
========================== */

function showLoader() {

    loader.classList.remove("hidden");

}

function hideLoader() {

    loader.classList.add("hidden");

}

/* ==========================
        TOAST
========================== */

function showToast(message, success = true) {

    toast.innerText = message;

    toast.style.background = success ? "#22c55e" : "#ef4444";

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}

/* ==========================
        SAVE NOTE
========================== */

async function saveNote() {

    const title = titleInput.value.trim();

    const description = descriptionInput.value.trim();

    if (title === "" || description === "") {

        showToast("Please enter title and description", false);

        return;

    }

    const note = {

        title: title,

        description: description

    };

    showLoader();

    try {

        let response;

        if (editingId === null) {

            response = await fetch(API_URL, {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(note)

            });

            showToast("Note Added Successfully");

        } else {

            response = await fetch(`${API_URL}/${editingId}`, {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(note)

            });

            showToast("Note Updated Successfully");

            editingId = null;

            editingStatus.innerText = "OFF";

            saveBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Save Note`;

        }

        if (!response.ok) {

            throw new Error("Operation Failed");

        }

        titleInput.value = "";

        descriptionInput.value = "";

        await loadNotes();

    }

    catch(e){

        showToast(e.message,false);

    }

    finally{

        hideLoader();

    }

}

/* ==========================
        LOAD NOTES
========================== */

async function loadNotes(){

    showLoader();

    try{

        const response = await fetch(API_URL);

        if(!response.ok){

            throw new Error("Unable to Load Notes");

        }

        allNotes = await response.json();

        totalNotes.innerText = allNotes.length;

        displayNotes(allNotes);

    }

    catch(e){

        notesContainer.innerHTML=`
        <div class="note">

            <h3>No Notes Found</h3>

            <p>Create your first note.</p>

        </div>
        `;

    }

    finally{

        hideLoader();

    }

}

/* ==========================
        DISPLAY NOTES
========================== */

function displayNotes(notes){

    let output="";

    notes.forEach(note=>{

        output+=`

        <div class="note">

            <h3>${note.title}</h3>

            <p>${note.description}</p>

            <button
                onclick="editNote(${note.id},
                '${note.title.replace(/'/g,"\\'")}',
                '${note.description.replace(/'/g,"\\'")}')">

                ✏ Edit

            </button>

            <button onclick="deleteNote(${note.id})">

                🗑 Delete

            </button>

        </div>

        `;

    });

    notesContainer.innerHTML=output;

}

/* ==========================
        EDIT NOTE
========================== */

function editNote(id,title,description){

    titleInput.value=title;

    descriptionInput.value=description;

    editingId=id;

    editingStatus.innerText="ON";

    saveBtn.innerHTML=`
    <i class="fa-solid fa-pen"></i>
    Update Note
    `;

    titleInput.focus();

}
/* ==========================
        DELETE NOTE
========================== */

async function deleteNote(id) {

    const confirmDelete = confirm("Are you sure you want to delete this note?");

    if (!confirmDelete) {
        return;
    }

    showLoader();

    try {

        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Delete Failed");
        }

        showToast("Note Deleted Successfully");

        await loadNotes();

    } catch (error) {

        console.error(error);

        showToast("Unable to delete note", false);

    } finally {

        hideLoader();

    }
}