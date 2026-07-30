const currentUser = localStorage.getItem("currentUser");

const themeBtn = document.getElementById("themeBtn");
const container = document.querySelector(".container");

if (!currentUser) {
    window.location.href = "login.html";
}

const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
const logoutBtn = document.getElementById("logoutBtn");

// save notes for current user
function updateStorage() {
    localStorage.setItem(
        "notes_" + currentUser,
        notesContainer.innerHTML
    );
}

// show saved notes
function showNotes() {
    const savedNotes = localStorage.getItem(
        "notes_" + currentUser
    );

    if (savedNotes) {
        notesContainer.innerHTML = savedNotes;
    }

    arrangeNotes();
}

showNotes();

// create a new note
createBtn.addEventListener("click", function () {

    const inputBox = document.createElement("div");
    const noteText = document.createElement("p");
    const deleteImg = document.createElement("img");
    const pinBtn = document.createElement("button");

    inputBox.className = "input-box";

    // only this area can be edited
    noteText.className = "note-text";
    noteText.setAttribute("contenteditable", "true");

    pinBtn.innerHTML = "📌 Pin";
    pinBtn.className = "pin-btn";

    deleteImg.src = "deleteicon.png";
    deleteImg.className = "delete-icon";

    inputBox.appendChild(noteText);
    inputBox.appendChild(pinBtn);
    inputBox.appendChild(deleteImg);

    notesContainer.appendChild(inputBox);

    // automatically place cursor in new note
    noteText.focus();

    updateStorage();
});

// delete and pin notes
notesContainer.addEventListener("click", function (e) {

    if (e.target.classList.contains("delete-icon")) {

        const note = e.target.closest(".input-box");

        if (note) {
            note.remove();
            updateStorage();
        }

    } else if (e.target.classList.contains("pin-btn")) {

        const note = e.target.closest(".input-box");

        if (note.classList.contains("pinned")) {

            note.classList.remove("pinned");
            e.target.innerHTML = "📌 Pin";

        } else {

            note.classList.add("pinned");
            e.target.innerHTML = "📍 Unpin";

        }

        arrangeNotes();
        updateStorage();
    }
});

// save while typing
notesContainer.addEventListener("input", function (e) {

    if (e.target.classList.contains("note-text")) {
        updateStorage();
    }

});

// keep pinned notes at the top
function arrangeNotes() {

    const allNotes = Array.from(
        notesContainer.querySelectorAll(".input-box")
    );

    const pinnedNotes = allNotes.filter(function (note) {
        return note.classList.contains("pinned");
    });

    const normalNotes = allNotes.filter(function (note) {
        return !note.classList.contains("pinned");
    });

    pinnedNotes.forEach(function (note) {
        notesContainer.appendChild(note);
    });

    normalNotes.forEach(function (note) {
        notesContainer.appendChild(note);
    });
}

// USER LOGOUT
if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        localStorage.removeItem("currentUser");

        window.location.href = "login.html";

    });

}

//  saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    container.classList.add("dark-mode");
    themeBtn.innerHTML = "☀️ Light";
}

// change theme light<->dark
themeBtn.addEventListener("click", function () {

    container.classList.toggle("dark-mode");

    if (container.classList.contains("dark-mode")) {

        themeBtn.innerHTML = "☀️ Light";

        localStorage.setItem(
            "theme",
            "dark"
        );

    } else {

        themeBtn.innerHTML = "🌙 Dark";

        localStorage.setItem(
            "theme",
            "light"
        );

    }

});