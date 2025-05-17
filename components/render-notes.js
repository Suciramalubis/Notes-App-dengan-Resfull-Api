export function renderNotes(notes) {
    const notesContainer = document.getElementById('notes-container');
    notesContainer.innerHTML = '';
  
    notes.forEach(note => {
      const noteElement = document.createElement('div');
      noteElement.classList.add('note-item');
      noteElement.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.body}</p>
        <small><strong>Tags:</strong> ${note.tags.join(', ')}</small>
      `;
      notesContainer.appendChild(noteElement);
    });
  }