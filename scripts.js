document.addEventListener('DOMContentLoaded', function () {
    loadNotes();
});

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const notesContainer = document.getElementById('notes-container');
    notesContainer.innerHTML = '';

    notes.forEach(function (note) {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');

        const noteText = document.createElement('p');
        noteText.textContent = note.text;

        const noteDate = document.createElement('p');
        noteDate.textContent = 'Criado em: ' + new Date(note.date).toLocaleString();

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = function () {
            editNote(note.date);
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.onclick = function () {
            deleteNoteConfirmation(note.date);
        };

        noteDiv.appendChild(noteText);
        noteDiv.appendChild(noteDate);
        noteDiv.appendChild(editButton);
        noteDiv.appendChild(deleteButton);

        notesContainer.appendChild(noteDiv);
    });
}

function createNote() {
    const noteText = document.getElementById('note-text').value.trim();
    if (noteText !== '') {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        const note = {
            text: noteText,
            date: new Date()
        };
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes();
        document.getElementById('note-text').value = '';
    } else {
        alert('Digite algo para criar uma nota.');
    }
}

function editNote(date) {
    const newText = prompt('Digite o novo texto para a nota:');
    if (newText !== null) {
        const notes = JSON.parse(localStorage.getItem('notes'));
        const updatedNotes = notes.map(function (note) {
            if (note.date === date) {
                return {
                    text: newText,
                    date: note.date
                };
            }
            return note;
        });
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
        loadNotes();
    }
}

function deleteNoteConfirmation(date) {
    const confirmDelete = confirm("Tem certeza de que deseja excluir esta nota?");
    if (confirmDelete) {
        deleteNote(date);
    }
}

function deleteNote(date) {
    const notes = JSON.parse(localStorage.getItem('notes'));
    const updatedNotes = notes.filter(function (note) {
        return note.date !== date;
    });
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    loadNotes();
}
